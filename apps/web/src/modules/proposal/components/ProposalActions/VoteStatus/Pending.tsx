import { Flex, Text } from '@zoralabs/zord'
import React, { Fragment, useState } from 'react'
import { useSWRConfig } from 'swr'

import { Countdown } from 'src/components/Countdown'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProposal } from 'src/data/subgraph/requests/proposalQuery'
import { useTimeout } from 'src/hooks/useTimeout'
import { useChainStore } from 'src/stores/useChainStore'

interface PendingProps {
  voteStart: number
  proposalId: string
}

const Pending: React.FC<PendingProps> = ({ voteStart, proposalId }) => {
  const { mutate } = useSWRConfig()

  const [isEnded, setIsEnded] = useState<boolean>(false)
  const chain = useChainStore((x) => x.chain)

  const isEndedtimeout = isEnded ? 4000 : null
  useTimeout(() => {
    mutate([SWR_KEYS.PROPOSAL, chain.id, proposalId], getProposal(chain.id, proposalId))
  }, isEndedtimeout)

  const onEnd = () => {
    setIsEnded(true)
  }

  return (
    <Fragment>
      <Flex
        w={{ '@initial': '100%', '@768': 'auto' }}
        justify={'center'}
        align={'center'}
        borderRadius={'curved'}
        borderColor={'border'}
        borderWidth={'normal'}
        borderStyle={'solid'}
        px={'x2'}
        py={'x4'}
        style={{ background: '#FBFBFB', maxHeight: 40, minWidth: 124 }}
      >
        <Text
          fontWeight={'display'}
          style={{
            fontVariantNumeric: 'tabular-nums',
            fontFeatureSettings: 'tnum',
          }}
        >
          <Countdown end={voteStart} onEnd={onEnd} />
        </Text>
      </Flex>

      <Flex textAlign={'center'}>
        <Text
          color={'text3'}
          variant={'paragraph-md'}
          ml={{ '@initial': 'x0', '@768': 'x3' }}
        >
          Time until voting starts
        </Text>
      </Flex>
    </Fragment>
  )
}

export default Pending
