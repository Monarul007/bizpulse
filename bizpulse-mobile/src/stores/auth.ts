import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import api from '../lib/api';

interface AuthState {
  token: string | null;
  user: { id: number; name: string; email: string } | null;
  tenant: { id: number; name: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const secureStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, user: null, tenant: null, isAuthenticated: false,
      login: async (email: string, password: string) => {
        const res = await api.post('/sanctum/token', { email, password });
        const { token, user, tenant } = res.data;
        set({ token, user, tenant, isAuthenticated: true });
      },
      logout: () => set({ token: null, user: null, tenant: null, isAuthenticated: false }),
    }),
    { name: 'bizpulse-auth', storage: createJSONStorage(() => secureStorage) }
  )
);
