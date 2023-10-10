import { style, styleVariants } from '@vanilla-extract/css'
import { atoms, vars } from '@zoralabs/zord'

export const wrapper = atoms({
  flexDirection: 'column',
  width: '100%',
  justifyContent: { '@initial': 'flex-start', '@768': 'center' },
  mb: {
    '@initial': 'x9',
    '@768': 'x0',
  },
  pt: { '@initial': 'x16', '@768': 'x30' },
  pb: { '@initial': 'x20', '@768': 'x30' },
})

export const preAuctionButton = style({
  width: 448,
  height: 56,
  borderRadius: '12px',
  fontFamily: 'Inter, sans-serif!important',
  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: 'calc(100% - 50px)',
    },
  },
})

export const preAuctionButtonVariants = styleVariants({
  start: [preAuctionButton, { marginBottom: 16 }],
  edit: [
    preAuctionButton,
    {
      paddingLeft: 0,
      paddingRight: 0,
      background: vars.color.background2,
      color: '#000',
      selectors: {
        '&:hover': {
          opacity: 1,
          backgroundColor: '#cdc9c9!important',
        },
      },
    },
  ],
})

export const preAuctionWrapper = style({
  width: '100%',
  alignItems: 'center',
})

export const preAuctionHelperText = style({
  color: '#808080',
  fontSize: 16,
  lineHeight: '24px',
})
