import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  add: (product) => {
    const items = [...get().items, product];
    const total = items.reduce((sum, i) => sum + i.price, 0);
    set({ items, total });
  },

  remove: (id) => {
    const items = get().items.filter((p) => p._id !== id);
    const total = items.reduce((sum, i) => sum + i.price, 0);
    set({ items, total });
  },

  clear: () => set({ items: [], total: 0 }),
}));
