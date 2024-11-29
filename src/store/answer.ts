import { create } from 'zustand';

interface AnswerProps {
    isAnswerCorrect: boolean | null;
    setIsAnswerCorrect: (value: boolean | null) => void;
}

export const useAnswerStore = create<AnswerProps>((set) => ({
    isAnswerCorrect: false,
    setIsAnswerCorrect: (value: boolean | null) => set(() => ({ isAnswerCorrect: value })),
}));
