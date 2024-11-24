import {create} from "zustand";

interface OnboardAuthState {
	token: string;

	setToken: (token: string) => void;
}

const useOnboardAuth = create<OnboardAuthState>((set) => ({
	token: '',
	setToken: (token) => set({token}),
}));

export default useOnboardAuth;