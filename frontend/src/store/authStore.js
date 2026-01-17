import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    set({ user, token });
    localStorage.setItem('dmx_user', JSON.stringify(user));
    localStorage.setItem('dmx_token', token);
  },

  load: () => {
    const user = JSON.parse(localStorage.getItem('dmx_user'));
    const token = localStorage.getItem('dmx_token');
    if (token) set({ user, token });
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('dmx_user');
    localStorage.removeItem('dmx_token');
  }
}));
