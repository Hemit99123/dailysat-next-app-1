import { create } from 'zustand';
import { User } from '@/types/user';

interface QuestionStoreProps {
  user: User | null; // Allow null for the initial state
  setUser: (newQuestion: User | null) => void;
}

// These are the stores (there are a lot)
export const useUserStore = create<QuestionStoreProps>((set) => ({
  user: null, // Initialize with null
  setUser: (newData: User | null) =>
    set(() => ({ user: newData })),
}));
