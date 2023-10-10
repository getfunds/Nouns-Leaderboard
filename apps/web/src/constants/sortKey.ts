import { Auction_OrderBy } from 'src/data/subgraph/sdk.generated'

export const SORT_KEY = {
  [Auction_OrderBy.DaoTotalAuctionSales]: 'By Total Auction Sales',
  [Auction_OrderBy.DaoOwnerCount]: 'By Total Owners',
  [Auction_OrderBy.DaoTotalSupply]: 'By Total Supply',
}
