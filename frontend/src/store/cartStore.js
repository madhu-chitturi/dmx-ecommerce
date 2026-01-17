import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  add: (p) =>
    set((state) => ({
      items: [...state.items, p],
    })),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((x) => x._id !== id),
    })),
  clear: () => set({ items: [] }),
}));
