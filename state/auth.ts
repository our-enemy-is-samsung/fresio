import {create} from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuth = create<AuthState>((set) => ({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
}));

export default useAuth;