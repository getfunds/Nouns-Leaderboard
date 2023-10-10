import { Box } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'

import { VersionType } from 'src/modules/create-proposal/constants'
import { useAvailableUpgrade } from 'src/modules/create-proposal/hooks'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'

import { Alert } from '../../Alert'
import { UpgradeCard } from '../../UpgradeCard'

export interface UpgradeRequiredProps {
  contractVersion: VersionType
}

const animation = {
  init: {
    height: 0,
    overflow: 'hidden',
    transition: {
      animate: 'easeInOut',
    },
  },
  open: {
    height: 'auto',
    transition: {
      animate: 'easeInOut',
    },
  },
}

export const UpgradeRequired: React.FC<UpgradeRequiredProps> = ({ contractVersion }) => {
  const addresses = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const {
    latest,
    date,
    transaction: upgradeTransaction,
    totalContractUpgrades,
  } = useAvailableUpgrade({
    chainId: chain.id,
    addresses,
    contractVersion,
  })
  const addTransaction = useProposalStore((state) => state.addTransaction)

  const handleUpgrade = (): void => {
    addTransaction(upgradeTransaction!)
  }

  return (
    <AnimatePresence>
      <motion.div initial={'init'} animate={'open'} variants={animation}>
        <Box mb={'x10'}>
          <UpgradeCard
            hasThreshold={true}
            totalContractUpgrades={totalContractUpgrades}
            version={latest}
            date={date}
            onUpgrade={handleUpgrade}
            alert={<Alert />}
          />
        </Box>
      </motion.div>
    </AnimatePresence>
  )
}
