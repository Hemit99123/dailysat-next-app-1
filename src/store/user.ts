import { AuthResponse } from '@/app/signup/page';
import { create } from 'zustand';

interface UserStore {
    user: AuthResponse;
    setUser: (user: AuthResponse) => void;
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

export default useUserStore;
