import { Stack } from '@zoralabs/zord'
import React from 'react'

import { Meta } from 'src/components/Meta'
import { AuctionFragment } from 'src/data/subgraph/sdk.generated'
import { getHomeLayout } from 'src/layouts/HomeLayout'
import Leaderboard from "./leaderboard"
import { NextPageWithLayout } from './_app'

export type DaoProps = AuctionFragment['dao']

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Meta title={'Nouns your ideas'} type={'website'} slug={'/'} />
      <Stack align={'center'}>
        <Leaderboard/>
      </Stack>
    </>
  )
}

HomePage.getLayout = getHomeLayout

export default HomePage
