import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  admin: null,
  adminToken: null,

  setAuth: (user, token) => set({ user, token }),
  setAdmin: (admin, adminToken) => set({ admin, adminToken }),
  logout: () => set({ user: null, token: null }),
  logoutAdmin: () => set({ admin: null, adminToken: null }),
}));
