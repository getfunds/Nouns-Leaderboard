import { Flex, Grid } from '@zoralabs/zord'
import React, { Fragment, ReactNode } from 'react'
import useSWR from 'swr'
import { readContract } from 'wagmi/actions'

import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { getBids } from 'src/data/subgraph/requests/getBids'
import { AddressType, Chain } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

import { useAuctionEvents } from '../hooks'
import { auctionGrid, auctionWrapper } from './Auction.css'
import { AuctionDetails } from './AuctionDetails'
import { AuctionImage } from './AuctionImage'
import { AuctionPaused } from './AuctionPaused'
import { AuctionTokenPicker } from './AuctionTokenPicker'
import { BidAmount } from './BidAmount'
import { ActionsWrapper, BidHistory } from './BidHistory'
import { CurrentAuction } from './CurrentAuction'
import { WinningBidder } from './WinningBidder'

interface AuctionControllerProps {
  chain: Chain
  auctionAddress: string
  collection: string
  token: TokenWithWinner
  viewSwitcher?: ReactNode
}

export const Auction: React.FC<AuctionControllerProps> = ({
  chain,
  auctionAddress,
  collection,
  token,
}) => {
  const { mintDate, name, image, price: tokenPrice, owner: tokenOwner } = token

  const { data: auction } = useSWR(
    [SWR_KEYS.AUCTION, chain.id, auctionAddress],
    (_, chainId, auctionAddress) =>
      readContract({
        abi: auctionAbi,
        address: auctionAddress as AddressType,
        functionName: 'auction',
        chainId,
      }),
    { revalidateOnFocus: true }
  )

  const [tokenId, highestBid, highestBidder, _, endTime, settled] = unpackOptionalArray(
    auction,
    6
  )

  const isTokenActiveAuction = !settled && !!tokenId && tokenId.toString() == token.id

  useAuctionEvents({
    chainId: chain.id,
    collection,
    isTokenActiveAuction,
    tokenId: token.id,
  })

  const { data: bids } = useSWR(
    [SWR_KEYS.AUCTION_BIDS, chain.id, collection, token.id],
    () => getBids(chain.id, collection, token.id)
  )

  return (
    <Grid className={auctionGrid}>
      <AuctionImage
        key={`auction-${collection}-image-${token.id}`}
        image={image}
        isLoading={!auction}
      />
      <Flex
        direction={'column'}
        height={{ '@initial': 'auto', '@768': '100%' }}
        mt={{ '@initial': 'x4', '@768': 'x0' }}
        className={auctionWrapper}
      >
        <AuctionTokenPicker
          mintDate={mintDate}
          name={name}
          collection={collection}
          tokenId={Number(token.id)}
          currentAuction={Number(tokenId)}
        />

        {isTokenActiveAuction && !!auction && (
          <CurrentAuction
            chain={chain}
            tokenId={token.id}
            auctionAddress={auctionAddress}
            bid={highestBid}
            owner={highestBidder}
            endTime={endTime}
            bids={bids || []}
          />
        )}

        {!isTokenActiveAuction && !!auction && (
          <Fragment>
            <AuctionDetails>
              <BidAmount isOver bid={tokenPrice ?? undefined} />
              <WinningBidder owner={tokenOwner ?? undefined} />
            </AuctionDetails>
            <ActionsWrapper>
              <BidHistory bids={bids || []} />
            </ActionsWrapper>
            <AuctionPaused />
          </Fragment>
        )}
      </Flex>
    </Grid>
  )
}
