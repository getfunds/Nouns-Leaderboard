import { Box } from '@zoralabs/zord'
import React from 'react'

import { defaultFormHeading } from 'src/components/Fields/styles.css'
import { ImageProps } from 'src/hooks'

import { DragAndDropProps, LayerBox, OrderedTraits } from './LayerBox'

export interface ArtworkType {
  trait: string
  properties: string[]
}

interface LayerOrderingProps {
  title?: string
  images?: ImageProps[]
  artwork: ArtworkType[]
  orderedLayers: OrderedTraits
  setOrderedLayers: (orderedLayers: OrderedTraits) => void
}

export const LayerOrdering: React.FC<LayerOrderingProps> = ({
  title,
  images,
  artwork,
  orderedLayers,
  setOrderedLayers,
}) => {
  /*  init layers and drag and drop  */
  const [dragAndDrop, setDragAndDrop] = React.useState<DragAndDropProps | null>(null)
  React.useEffect(() => {
    if (!orderedLayers.length) {
      setOrderedLayers(artwork)
    }
  }, [artwork, orderedLayers, setOrderedLayers])

  if (!images) return null

  return (
    <Box>
      <h3 className={defaultFormHeading}>{title}</h3>
      {orderedLayers && (
        <Box>
          {orderedLayers.map(({ trait, properties }, index) => (
            <LayerBox
              key={trait}
              trait={trait}
              properties={properties}
              ipfs={images}
              setDragAndDrop={setDragAndDrop}
              dragAndDrop={dragAndDrop}
              orderedLayers={orderedLayers}
              setOrderedLayers={setOrderedLayers}
              index={index}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
