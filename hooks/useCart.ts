import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          let newItems;
          if (existing) {
            newItems = state.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            newItems = [...state.items, { ...product, quantity: 1 }];
          }
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
             const filtered = state.items.filter((i) => i.id !== id);
             return {
                items: filtered,
                total: filtered.reduce((sum, i) => sum + i.price * i.quantity, 0),
                itemCount: filtered.reduce((sum, i) => sum + i.quantity, 0),
             }
          }
          const newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: 'shopaholics-cart',
    }
  )
);