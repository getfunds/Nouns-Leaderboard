import {  Flex, Stack, atoms } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import { BridgeModal } from 'src/components/BridgeModal/BridgeModal'
import { NetworkController } from 'src/components/NetworkController'
import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { useBridgeModal } from 'src/hooks/useBridgeModal'
import { useScrollDirection } from 'src/hooks/useScrollDirection'

import NogglesLogo from '../assets/builder-framed.svg'
import TestnetLogo from '../assets/testnet.svg'
import { NavContainer, NavWrapper } from './Nav.styles.css'
import { NavMenu } from './NavMenu'

export const Nav = () => {
  const scrollDirection = useScrollDirection()
  const { canUserBridge, openBridgeModal } = useBridgeModal()

  return (
    <Flex
      align="center"
      justify="space-around"
      style={{
        top: scrollDirection === 'down' ? -80 : 0,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      }}
      className={NavContainer}
    >
      <BridgeModal />
      <Flex align={'center'} className={NavWrapper} justify={'space-between'}>
        <Flex align={'center'}>
          <Link href={'/'} passHref>
            <Stack>
              <NogglesLogo
                fill={'black'}
                className={atoms({ width: 'x23', cursor: 'pointer' })}
              />
              {PUBLIC_IS_TESTNET && (
                <TestnetLogo
                  className={atoms({
                    width: 'x23',
                    cursor: 'pointer',
                    mt: 'x1',
                  })}
                />
              )}
            </Stack>
          </Link>
          <Flex display={{ '@initial': 'none', '@768': 'flex' }} ml="x10" gap={'x4'}>
            
            
           
            <NetworkController.Mainnet>
              
            </NetworkController.Mainnet>
          </Flex>
        </Flex>

        <NavMenu />
      </Flex>
    </Flex>
  )
}
