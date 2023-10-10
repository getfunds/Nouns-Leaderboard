import { Flex } from '@zoralabs/zord'

import { Meta } from 'src/components/Meta'
import { getDefaultLayout } from 'src/layouts/DefaultLayout'

import { NextPageWithLayout } from './_app'

const MyDaosPage: NextPageWithLayout = () => {
  return (
    <Flex direction={'column'} align={'center'} mt={'x5'} minH={'100vh'}>
      <Meta title={'My Daos'} type={'website'} slug={'/mydaos'} />
      
    </Flex>
  )
}

MyDaosPage.getLayout = getDefaultLayout

export default MyDaosPage
