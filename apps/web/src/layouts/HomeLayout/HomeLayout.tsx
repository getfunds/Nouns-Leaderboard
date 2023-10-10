import { Box } from '@zoralabs/zord'
import React, { ReactElement, ReactNode } from 'react'

import { Nav } from '../DefaultLayout/Nav'
import { LayoutWrapper } from '../LayoutWrapper'

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Nav /> <br></br><br></br><br></br><br></br>
      <Box px={'x4'} pt={{ '@initial': 'x20', '@480': 'x0' }}>
        {children}
      </Box>
    </Box>
  )
}

export function getHomeLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <HomeLayout>{page}</HomeLayout>
    </LayoutWrapper>
  )
}
