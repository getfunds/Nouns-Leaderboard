import { style, styleVariants } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const copyButton = style([
  atoms({
    display: 'inline-flex',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 'round',
    borderStyle: 'solid',
    borderWidth: 'thin',
    cursor: 'pointer',
  }),
])

export const copyButtonVariants = styleVariants({
  default: [copyButton, atoms({ padding: 'x1' })],
  icon: [copyButton, atoms({ padding: 'x0' })],
})
