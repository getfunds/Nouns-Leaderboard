import { Box, Flex, Stack } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import { getFetchableUrl, normalizeIPFSUrl, uploadFile } from 'ipfs-service'
import Image from 'next/image'
import React, { ReactElement, useEffect, useState } from 'react'

import { Spinner } from 'src/components/Spinner'

import {
  defaultUploadStyle,
  singleImageUploadWrapper,
  uploadErrorBox,
} from './SingleImageUpload.css'

interface SingleImageUploadProps {
  formik: FormikProps<any>
  id: string
  inputLabel: string | ReactElement
  helperText: string | undefined
  value: string
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  id,
  formik,
  inputLabel,
  helperText,
  value,
}) => {
  const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']

  const [isMounted, setIsMounted] = useState(false)
  const [uploadArtworkError, setUploadArtworkError] = React.useState<any>()
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFileUpload = React.useCallback(
    async (_input: FileList | null) => {
      if (!_input) return
      const input = _input[0]

      setUploadArtworkError(false)

      if (input?.type?.length && !acceptableMIME.includes(input.type)) {
        setUploadArtworkError({
          message: `Sorry, ${input.type} is an unsupported file type`,
        })
        return
      }

      try {
        setIsUploading(true)

        const { cid } = await uploadFile(_input[0], { cache: true })

        formik.setFieldValue(id, normalizeIPFSUrl(cid))
        setIsUploading(false)
        setUploadArtworkError(null)
      } catch (err: any) {
        setIsUploading(false)
        setUploadArtworkError({
          ...err,
          message: `Sorry, there was an error with our file uploading service. ${err?.message}`,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Flex mb={'x8'}>
      <Stack align={'center'} width={'100%'}>
        <Flex
          as={'label'}
          direction={'column'}
          position={'relative'}
          align={'center'}
          justify={'center'}
          className={singleImageUploadWrapper}
          htmlFor="file-upload"
        >
          {isUploading && <Spinner alignSelf={'center'} m={'x0'} />}

          {!isUploading && isMounted && !!value && (
            <Image
              src={getFetchableUrl(value) || ''}
              fill
              alt="Avatar"
              style={{
                objectFit: 'contain',
              }}
            />
          )}

          {!isUploading && isMounted && !value && (
            <>
              <Flex color="text4" mb={'x2'}>
                {inputLabel}
              </Flex>
              <Flex fontWeight={'display'}>{helperText}</Flex>
            </>
          )}

          <input
            className={defaultUploadStyle}
            id="file-upload"
            data-testid="file-upload"
            name="file"
            type="file"
            multiple={true}
            onChange={(event) => {
              handleFileUpload(event.currentTarget.files)
            }}
          />
        </Flex>

        {uploadArtworkError && (
          <Box data-testid="error-msg" p={'x4'} fontSize={12} className={uploadErrorBox}>
            <Box as={'ul'} m={'x0'}>
              <li>{uploadArtworkError.message}</li>
            </Box>
          </Box>
        )}
      </Stack>
    </Flex>
  )
}

export default SingleImageUpload
