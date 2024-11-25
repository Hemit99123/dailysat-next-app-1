import { create } from 'zustand'

interface ModalProps {
    isOpen: boolean
    openModal: () => void;
    closeModal: () => void;
}

export const useScoreModalStore = create<ModalProps>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false }))
}))

export const useEditorialModalStore = create<ModalProps>((set) => ({
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () => set(() => ({ isOpen: false }))
}))

export const useStreakAnnouncerModalStore = create<ModalProps>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false }))
}))