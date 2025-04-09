
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthModalOpen: false,
  login: (user) => set({ user, isAuthenticated: true, isAuthModalOpen: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  toggleAuthModal: () => set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
}));
