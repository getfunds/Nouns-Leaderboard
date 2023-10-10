import { Box, Flex, Label, Paragraph } from '@zoralabs/zord'
import dayjs from 'dayjs'
import React from 'react'

import { ProposalState } from 'src/data/contract/requests/getProposalState'

import { parseBgColor, parseState, parseTime } from './ProposalStatus.helper'

type StatusProps = {
  state: ProposalState
  voteEnd: number
  voteStart: number
  expiresAt?: number
  className?: string
  flipped?: Boolean
  showTime?: Boolean
}

export const ProposalStatus: React.FC<StatusProps> = ({
  state,
  voteEnd,
  voteStart,
  expiresAt,
  className,
  flipped,
  showTime,
}) => {
  const now = dayjs.unix(Date.now() / 1000)

  const diffEnd = dayjs.unix(voteEnd).diff(now, 'second')
  const diffStart = dayjs.unix(voteStart).diff(now, 'second')
  const diffExpiration = expiresAt ? dayjs.unix(expiresAt).diff(now, 'second') : 0

  return (
    <Flex
      className={className}
      align="center"
      direction={flipped ? { '@768': 'row-reverse' } : {}}
    >
      {(!!state || state === ProposalState.Pending) && (
        <Box
          py={'x1'}
          px={'x3'}
          borderRadius={'round'}
          borderStyle={'solid'}
          borderWidth={'normal'}
          mr={flipped ? { '@initial': 'x3', '@768': 'x0' } : 'x3'}
          ml={flipped ? { '@768': 'x3' } : 'x0'}
          style={parseBgColor(state)}
        >
          <Label size="sm">{parseState(state)}</Label>
        </Box>
      )}
      {state === ProposalState.Pending && showTime && (
        <Paragraph color="text3" data-testid="time-prefix">
          {parseTime(diffStart, 'Starts')}
        </Paragraph>
      )}
      {state === ProposalState.Active && showTime && (
        <Paragraph color="text3" data-testid="time-prefix">
          {parseTime(diffEnd, 'Ends')}
        </Paragraph>
      )}
      {state === ProposalState.Queued && showTime && (
        <Paragraph color="text3" data-testid="time-prefix">
          {parseTime(diffExpiration, 'Expires')}
        </Paragraph>
      )}
    </Flex>
  )
}
