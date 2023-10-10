import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { exploreDaosRequests } from 'src/data/subgraph/requests/daolistQuery'
import { Auction_OrderBy } from 'src/data/subgraph/sdk.generated'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = 30
  const { page, orderBy, network } = req.query
  const pageInt = parseInt(page as string, 10) || 1

  const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug === network)

  if (!chain) return res.status(404).end()

  const exploreRes = await exploreDaosRequests(
    chain.id,
    (pageInt - 1) * limit,
    orderBy as Auction_OrderBy
  )

  const { maxAge, swr } = CACHE_TIMES.EXPLORE
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )
  
  res.status(200).send(exploreRes)
  
}


export default handler
