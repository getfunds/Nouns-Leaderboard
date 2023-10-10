import { style } from '@vanilla-extract/css'

export const getStartedButton = style({
  fontSize: 26,
  background: 'rgba(255,255,255,.3)',
  selectors: {
    '&:hover': {
      background: 'rgba(255,255,255,.35)',
      cursor: 'pointer',
    },
  },
  '@media': {
    '(max-width: 768px)': {
      fontSize: 16,
      padding: '12px 24px',
    },
  },
})

export const homeFooterLinks = style({
  selectors: {
    '&:hover': {
      color: '#fff',
      opacity: 0.8,
      cursor: 'pointer',
    },
  },
})

export const homeFooterInnerWrapper = style({
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
    },
  },
})

export const footerHeading = style({
  '@media': {
    '(max-width: 768px)': {
      maxWidth: 246,
      fontSize: 28,
    },
  },
})

export const footerLeftWrapper = style({
  maxWidth: 733,
  paddingLeft: 32,
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: 0,
      maxWidth: 246,
      fontSize: 28,
      marginLeft: 34,
    },
  },
})

export const footerRightWrapper = style({
  paddingRight: 32,
  '@media': {
    '(max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 32,
      marginTop: 32,
      borderTop: '2px solid #333333',
      paddingRight: 0,
    },
  },
})
