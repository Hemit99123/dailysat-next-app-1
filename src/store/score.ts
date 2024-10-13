import { create } from 'zustand'

interface ScoreStateProps {
    score: number;
    increaseScore: () => void;
}
const useScoreStore = create<ScoreStateProps>((set) => ({
  score: 0,
  increaseScore: () => set((state: { score: number }) => ({ score: state.score + 1 })),
}))

export default useScoreStore