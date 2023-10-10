import * as Sentry from '@sentry/nextjs'
import { base64 } from 'ethers/lib/utils'
import { readContract } from 'wagmi/actions'

import { tokenAbi } from 'src/data/contract/abis'
import {
  Token,
  TokenWinner,
  tokenQuery,
  tokenWinnerQuery,
} from 'src/data/subgraph/requests/tokenQuery'
import { AddressType, CHAIN_ID } from 'src/typings'

export interface TokenWithWinner extends Token, TokenWinner {}

const readTokenContractData = async (
  chainId: CHAIN_ID,
  tokenAddress: AddressType,
  id: string
): Promise<
  | {
      name: string
      image: string
      description: string
    }
  | undefined
> => {
  const result = await readContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'tokenURI',
    args: [BigInt(id)],
    chainId,
  })

  const decodeToUintArr = base64.decode(result?.substring(29, result.length) as string) //remove the url info from base64 encoding
  const parsedBuffer = Buffer.from(decodeToUintArr)
    .toString('utf-8')
    .replace(/style="/g, "style='")
    .replace(/;"/g, ";'") // using regex replace methods to prevent json parse error in the case of style tags with double quotes

  try {
    return JSON.parse(parsedBuffer)
  } catch (e) {
    return
  }
}

const logError = async (e: unknown) => {
  console.error(e)
  Sentry.captureException(e)
  await Sentry.flush(2000)
  return
}

const getToken = async (
  chainId: CHAIN_ID,
  tokenAddress: AddressType,
  id: string
): Promise<TokenWithWinner | undefined> => {
  let tokenData: TokenWithWinner = { id }

  try {
    const [token, tokenWinner] = await Promise.all([
      await tokenQuery(chainId, tokenAddress, id),
      await tokenWinnerQuery(chainId, tokenAddress, id),
    ])

    tokenData = {
      id,
      ...token,
      ...tokenWinner,
    }
  } catch (e) {
    await logError(e)
  }

  try {
    // fallback contract data, i.e. for when the data returned from the zora API has not
    // caught up to the latest token data
    if (!tokenData?.name || !tokenData?.image || !tokenData.description) {
      const tokenContractRes = await readTokenContractData(chainId, tokenAddress, id)
      if (tokenContractRes) {
        return {
          ...tokenData,
          name: tokenData.name || tokenContractRes.name,
          image: tokenData.image || tokenContractRes.image,
          description: tokenData.description || tokenContractRes.description,
        }
      }
    }

    return tokenData
  } catch (e) {
    await logError(e)
    return
  }
}

export default getToken
