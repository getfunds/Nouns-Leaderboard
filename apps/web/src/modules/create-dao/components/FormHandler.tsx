import { Box, Flex, Heading, Text, atoms } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import React from 'react'

import { Icon } from 'src/components/Icon'

import { CreateFormSection } from '../types'

interface FormHandlerProps extends CreateFormSection {
  sectionIndex: number
}

export const FormHandler = ({
  form,
  title,
  heading,
  subHeading,
  sectionIndex,
}: FormHandlerProps) => {
  return (
    <Box>
      <Flex align={'center'} justify={'space-between'}>
        <Text variant={'eyebrow'}>Create A dao</Text>
        {sectionIndex === 0 ? (
          <a
            href="https://docs.zora.co/docs/guides/builder-deployment"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Flex align={'center'} color={'text3'}>
              <Text
                fontWeight={'heading'}
                fontSize={12}
                className={atoms({ textDecoration: 'underline' })}
              >
                How to create a DAO?
              </Text>
              <Icon fill="text3" size="sm" ml="x1" id="external-16" />
            </Flex>
          </a>
        ) : (
          <></>
        )}
      </Flex>
      <Heading as={'h3'} mt={'x0'} mb={'x8'} fontSize={40}>
        {!heading ? title : heading}
      </Heading>
      {subHeading && (
        <Box mb={'x7'} color={'text2'}>
          {subHeading}
        </Box>
      )}
      <motion.div
        key={title}
        variants={{
          exit: {
            y: 10,
            opacity: 0,
          },
          closed: {
            y: 10,
            opacity: 0,
          },
          open: {
            y: 0,
            opacity: 1,
          },
        }}
        initial="closed"
        animate="open"
        exit="exit"
      >
        {form}
      </motion.div>
    </Box>
  )
}
