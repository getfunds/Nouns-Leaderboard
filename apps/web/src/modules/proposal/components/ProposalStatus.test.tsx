import { screen } from '@testing-library/react'
import dayjs from 'dayjs'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { render } from 'src/test/utils'

import { ProposalStatus } from './ProposalStatus'

describe('proposal status', () => {
  const date = new Date(2022, 1, 1)

  beforeEach(() => {
    vi.setSystemTime(date)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render a succeeded proposal', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Succeeded}
        voteEnd={dayjs('2/1/21').unix()}
        voteStart={dayjs('1/1/21').unix()}
        showTime
      />
    )

    expect(screen.getByText('Succeeded')).toBeInTheDocument()
    expect(screen.queryByTestId('time-prefix')).not.toBeInTheDocument()
  })

  it('should render a defeated proposal', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Defeated}
        voteEnd={dayjs('2/1/21').unix()}
        voteStart={dayjs('1/1/21').unix()}
        showTime
      />
    )

    expect(screen.getByText('Defeated')).toBeInTheDocument()
    expect(screen.queryByTestId('time-prefix')).not.toBeInTheDocument()
  })

  it('should render a cancelled proposal', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Canceled}
        voteEnd={dayjs('2/1/21').unix()}
        voteStart={dayjs('1/1/21').unix()}
        showTime
      />
    )

    expect(screen.getByText('Cancelled')).toBeInTheDocument()
    expect(screen.queryByTestId('time-prefix')).not.toBeInTheDocument()
  })

  it('should render a pending proposal that has not started', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Pending}
        voteEnd={dayjs(date).add(5, 'day').unix()}
        voteStart={dayjs(date).add(3, 'day').unix()}
        showTime
      />
    )

    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Starts in 3 days')).toBeInTheDocument()
  })

  it('should render an active proposal that ends in 1 day', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Active}
        voteEnd={dayjs(date).add(1, 'day').unix()}
        voteStart={dayjs(date).subtract(1, 'day').unix()}
        showTime
      />
    )

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Ends in 1 day')).toBeInTheDocument()
  })

  it('should render a queued proposal that expires in 14 days', async () => {
    render(
      <ProposalStatus
        state={ProposalState.Queued}
        voteEnd={dayjs(date).subtract(2, 'day').unix()}
        voteStart={dayjs(date).subtract(4, 'day').unix()}
        expiresAt={dayjs(date).add(14, 'day').unix()}
        showTime
      />
    )

    expect(screen.getByText('Queued')).toBeInTheDocument()
    expect(screen.getByText('Expires in 14 days')).toBeInTheDocument()
  })
})
