import { User } from '@/app/auth/page';
import { create } from 'zustand';

interface UserStore {
    user: User;
    setUser: (user: User) => void;
    resetUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: {},
    setUser: (user) => set({ user }), // Set the entire list of editorial data
    resetUser: () => set({ user: {} }), // Reset the editorial list to an empty array
}));

interface LoggedInStore {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    resetLoggedIn: () => void;
}
export const useLoggedInStore = create<LoggedInStore>((set) => ({
    loggedIn: false,
    setLoggedIn: (loggedIn) => set({ loggedIn }),
    resetLoggedIn: () => set({ loggedIn: false })
}))

interface CoinStore {
    coins : number,
    setCoins : (coins : number) => void,
    resetCoins : () => void
}
export const useCoinStore = create<CoinStore>((set) => ({
    coins : 0,
    setCoins : (coins) => set({coins}),
    resetCoins : () => set({coins : 0})
}))

export default useUserStore;
