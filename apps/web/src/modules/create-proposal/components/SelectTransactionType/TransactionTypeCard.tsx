import { Flex, Stack, Text } from '@zoralabs/zord'
import React from 'react'

import { TRANSACTION_TYPES, TransactionType } from '../../constants'
import { TransactionTypeIcon } from '../TransactionTypeIcon'

interface TransactionTypeCardProps {
  transactionType: TransactionType
  onClick: () => void
}

const TransactionTypeCard: React.FC<TransactionTypeCardProps> = ({
  transactionType,
  onClick,
}) => {
  return (
    <Flex gap={'x4'} align={'center'} onClick={onClick} cursor={'pointer'}>
      <TransactionTypeIcon transactionType={transactionType} large />
      <Stack>
        <Text variant={'label-lg'} mb={'x1'}>
          {TRANSACTION_TYPES[transactionType].title}
        </Text>
        <Text>{TRANSACTION_TYPES[transactionType].subTitle}</Text>
      </Stack>
    </Flex>
  )
}

export default TransactionTypeCard
