import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProposalVoteSupport as Support } from 'src/data/subgraph/sdk.generated'
import { render } from 'src/test/utils'

import Vote from './Vote'

describe('VoteStatus', () => {
  it('should render voted for with 3 votes', () => {
    render(<Vote support={Support.For} weight={3} />)

    expect(screen.getByText(/You voted/)).toBeInTheDocument()
    expect(screen.getByText(/for/)).toBeInTheDocument()
    expect(screen.getByText(/with 3 votes/)).toBeInTheDocument()
  })

  it('should render voted against with 1 vote', () => {
    render(<Vote support={Support.Against} weight={1} />)

    expect(screen.getByText(/You voted/)).toBeInTheDocument()
    expect(screen.getByText(/against/)).toBeInTheDocument()
    expect(screen.getByText(/with 1 vote/)).toBeInTheDocument()
  })

  it('should render an abstained vote', () => {
    render(<Vote support={Support.Abstain} weight={1} />)

    expect(screen.getByText('You abstained from voting')).toBeInTheDocument()
  })
})
