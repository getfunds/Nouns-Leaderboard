import { Button, Flex } from '@zoralabs/zord'
import React, { useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import { ContractButton } from 'src/components/ContractButton'
import { auctionAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'

import { auctionActionButtonVariants } from '../Auction.css'

interface SettleProps {
  isEnding: boolean
  collectionAddress?: string
  owner?: string | undefined
}

export const Settle = ({ isEnding, owner }: SettleProps) => {
  const chain = useChainStore((x) => x.chain)
  const addresses = useDaoStore((state) => state.addresses)

  const { address } = useAccount()
  const isWinner = owner != undefined && address == owner

  const { data: paused } = useContractRead({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    chainId: chain.id,
    abi: auctionAbi,
    functionName: 'paused',
  })

  const { config, error } = usePrepareContractWrite({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    abi: auctionAbi,
    functionName: paused ? 'settleAuction' : 'settleCurrentAndCreateNewAuction',
  })

  const { writeAsync } = useContractWrite(config)

  const [settling, setSettling] = useState(false)

  const handleSettle = async () => {
    if (!!error) return

    setSettling(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setSettling(false)
    } catch (error) {
      setSettling(false)
    }
  }

  if (isEnding && !settling) {
    return (
      <Flex direction="column" align="center" width={'100%'}>
        <Button disabled className={auctionActionButtonVariants['settling']}>
          Auction ending
        </Button>
      </Flex>
    )
  }

  if (settling) {
    return (
      <Flex direction="column" align="center" width={'100%'}>
        <Button disabled className={auctionActionButtonVariants['settling']}>
          Settling
        </Button>
      </Flex>
    )
  }

  return (
    <Flex direction="column" align="center" width={'100%'}>
      <ContractButton
        handleClick={handleSettle}
        className={auctionActionButtonVariants['settle']}
      >
        {isWinner ? 'Claim NFT' : 'Start next auction'}
      </ContractButton>
    </Flex>
  )
}
