import { Box, Flex, Text } from '@zoralabs/zord'
import React from 'react'

import { Avatar } from 'src/components/Avatar'
import { useEnsData } from 'src/hooks/useEnsData'

import { recentBidder } from '../Auction.css'

interface BidderProps {
  address: string
}

export const Bidder: React.FC<BidderProps> = ({ address }) => {
  const { displayName, ensAvatar } = useEnsData(address)

  return (
    <Flex align="center">
      <Box mr="x2">
        <Avatar address={address} src={ensAvatar} size="32" />
      </Box>
      <Text className={recentBidder} variant="paragraph-md">
        {displayName}
      </Text>
    </Flex>
  )
}
