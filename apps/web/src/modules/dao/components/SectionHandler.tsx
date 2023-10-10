import { Box, Flex, Text } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { ReactElement } from 'react'

import {
  sectionHandler,
  sectionNavigation,
  sectionNavigationWrapper,
  sectionTabVariants,
} from 'src/styles/SectionNavigation.css'
import { slugify } from 'src/utils/slugify'
import { unslugify } from 'src/utils/unslugify'

interface SectionHandlerProps {
  sections: {
    title: string
    component: ReactElement[]
  }[]
  activeTab: string
  basePath: string
}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

export const SectionHandler: React.FC<SectionHandlerProps> = ({
  sections,
  activeTab,
  basePath,
}) => {
  /*

    handle active session if:
    - query tab is defined
    - unknown query tab is set

   */
  const tab = React.useCallback(
    (title: string) => {
      return sections?.find((section) => section.title === title)
    },
    [sections]
  )

  const activeSection: activeSectionProps | undefined = React.useMemo(() => {
    return tab(unslugify(activeTab))
  }, [activeTab, tab])

  return (
    <>
      {sections && sections.length > 1 && (
        <Box position={'relative'} className={sectionNavigationWrapper}>
          <Flex
            px={'x2'}
            mx={{ '@initial': 'x0', '@768': 'auto' }}
            justify={'center'}
            className={sectionNavigation}
            w={'100%'}
          >
            {sections?.map((section, index) => {
              return (
                <Link
                  href={{
                    pathname: basePath,
                    query: {
                      tab: slugify(section.title),
                    },
                  }}
                  scroll={false}
                  shallow={true}
                  key={section.title}
                >
                  <Flex
                    direction="column"
                    key={index}
                    className={
                      sectionTabVariants[
                        activeSection?.title === section.title ? 'active' : 'default'
                      ]
                    }
                    w={'100%'}
                    align={'center'}
                  >
                    <Text fontWeight={'display'}>{section.title}</Text>
                  </Flex>
                </Link>
              )
            })}
          </Flex>
        </Box>
      )}
      <Flex direction="column" className={sectionHandler} mx={'auto'}>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            key={activeSection?.title}
            variants={{
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
            exit="closed"
          >
            {!!activeSection && <>{React.cloneElement(activeSection.component[0])}</>}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </>
  )
}
