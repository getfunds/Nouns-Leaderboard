import { Box, Grid } from '@zoralabs/zord'
import React from 'react'

import { imageGridWrapperStyle, previewGeneratedImageStyle } from 'src/styles/Artwork.css'

export const ImageGrid: React.FC<{ generatedImages: string[] }> = ({
  generatedImages,
}) => {
  return (
    <Grid gap="x4" className={imageGridWrapperStyle}>
      {generatedImages &&
        generatedImages.map((image: any, index: number) => (
          <Box className={previewGeneratedImageStyle} key={index}>
            <img src={image} alt="" height={'100%'} width={'100%'} />
          </Box>
        ))}
    </Grid>
  )
}
