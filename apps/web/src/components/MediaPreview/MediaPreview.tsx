import { Box } from '@zoralabs/zord'
import { getFetchableUrl } from 'ipfs-service'
import { useMemo } from 'react'

import { Audio } from './Audio'
import { Image } from './Image'
import { Video } from './Video'

export interface MediaPreviewProps {
  mediaUrl: string
  mediaType?: string
  coverUrl?: string
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  mediaType,
  mediaUrl,
  coverUrl,
}) => {
  const fetchableMediaURL = useMemo(() => getFetchableUrl(mediaUrl) || '', [mediaUrl])
  const fetchableCoverURL = useMemo(() => getFetchableUrl(coverUrl) || '', [coverUrl])

  if (fetchableMediaURL && mediaType?.startsWith('image')) {
    return <Image src={fetchableMediaURL} />
  }

  if (fetchableMediaURL && mediaType?.startsWith('video')) {
    return <Video src={fetchableMediaURL} />
  }

  if (fetchableMediaURL && mediaType?.startsWith('audio')) {
    return <Audio src={fetchableMediaURL} cover={fetchableCoverURL} />
  }

  return <Box backgroundColor="background2" w="100%" h="100%" borderRadius={'curved'} />
}
