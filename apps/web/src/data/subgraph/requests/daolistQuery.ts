import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import {
  Auction_Filter,
  Auction_OrderBy,
  ExploreDaoFragment,
  OrderDirection,
} from '../sdk.generated'


export type ExploreDaoWithChainId = ExploreDaoFragment & { chainId: CHAIN_ID }

export interface ExploreDaosResponse {
  daos: ExploreDaoWithChainId[]
  hasNextPage: boolean
}


export const exploreDaosRequests = async (
  chainId: CHAIN_ID,
  skip: number,
  orderBy: Auction_OrderBy = Auction_OrderBy.DaoTotalAuctionSales
): Promise<ExploreDaosResponse | undefined> => {
  try {
    const orderDirection =
      orderBy === Auction_OrderBy.DaoTotalAuctionSales ? OrderDirection.Desc : OrderDirection.Asc

    const where: Auction_Filter = {
      settled: false,
    }

    const first = 30

    // filter spam daos from L2
    if (
      chainId === CHAIN_ID.BASE ||
      chainId === CHAIN_ID.ZORA ||
      chainId === CHAIN_ID.OPTIMISM
    ) {
      const activeDaos = await SDK.connect(chainId).activeDaos({
        first,
        where: { totalAuctionSales_gt: '1000000000000000' },
      })

      // If we have less than one explore page of active daos, we apply the filter
      if (activeDaos.daos.length !== first)
        where.dao_in = activeDaos.daos.map((x) => x.id)
    }


    const data = await SDK.connect(chainId).exploreDaosPage({
      orderBy,
      orderDirection,
      where,
      skip,
      first,
    })

    if (!data.auctions) return undefined
    return {
      daos: data.auctions.map((x) => ({ ...x, chainId })),
      hasNextPage: data.auctions.length === first,
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}
