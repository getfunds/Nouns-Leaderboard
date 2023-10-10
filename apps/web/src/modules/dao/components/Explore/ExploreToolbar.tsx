import { Box, Flex } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount } from 'wagmi'

import ExploreSortMenu from './ExploreSortMenu'

interface ExploreToolbarProps {
  title: string
  showSort?: boolean
}

const ExploreToolbar: React.FC<ExploreToolbarProps> = ({ title, showSort = false }) => {
  const router = useRouter()
  const { address } = useAccount()

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      mb={address ? 'x0' : 'x5'}
      align={'center'}
      style={{ maxWidth: 912 }}
    >
      <Flex direction={'row'} w={'100%'} justify={'space-between'}>
        <Box fontSize={28} fontWeight={'heading'} mb={'x8'}>
          {title}
        </Box>
        {showSort && (
          <ExploreSortMenu choice={(router.query?.sortKey as string) || 'By Total Auction Sales'} />
        )}
      </Flex>
      
    </Flex>
  )
}

export default ExploreToolbar
