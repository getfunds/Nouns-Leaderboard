import { create } from 'zustand'

import { OrderedTraits } from 'src/components/Artwork/LayerBox'
import { IPFSUpload } from 'src/hooks'
import { ArtworkType } from 'src/modules/create-dao/components'

export interface ArtworkFormValues {
  artwork: Array<ArtworkType>
  filesLength: number | string
}

export interface ArtworkStore {
  setUpArtwork: ArtworkFormValues
  setSetUpArtwork: (artwork: ArtworkFormValues) => void
  ipfsUpload: IPFSUpload[]
  setIpfsUpload: (ipfsUpload: IPFSUpload[]) => void
  orderedLayers: OrderedTraits
  setOrderedLayers: (orderedLayers: OrderedTraits) => void
  isUploadingToIPFS: boolean
  setIsUploadingToIPFS: (bool: boolean) => void
  resetForm: () => void
}

const initialState = {
  setUpArtwork: {
    artwork: [],
    filesLength: '',
  },
  ipfsUpload: [],
  orderedLayers: [],
  isUploadingToIPFS: false,
}

export const useArtworkStore = create<ArtworkStore>((set) => ({
  ...initialState,
  setSetUpArtwork: (artwork: ArtworkFormValues) => set({ setUpArtwork: artwork }),
  setIpfsUpload: (ipfsUpload: IPFSUpload[]) => set({ ipfsUpload }),
  setOrderedLayers: (orderedLayers: OrderedTraits) => {
    set({
      orderedLayers,
    })
  },
  setIsUploadingToIPFS: (isUploadingToIPFS: boolean) => set({ isUploadingToIPFS }),
  resetForm: () => set({ ...initialState }),
}))
