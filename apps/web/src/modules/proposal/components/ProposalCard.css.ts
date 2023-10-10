import { style } from '@vanilla-extract/css'
import { media } from '@zoralabs/zord'

export const titleStyle = style([
  {
    order: 2,
    '@media': {
      [media.min768]: { order: 1, width: '65%' },
    },
  },
])

export const statusStyle = style([
  {
    order: 1,
    '@media': {
      [media.min768]: { order: 2 },
    },
  },
])
