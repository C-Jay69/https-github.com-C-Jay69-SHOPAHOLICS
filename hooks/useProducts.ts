import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductStore {
  products: Product[];
  addProducts: (newProducts: Product[]) => void;
  setProducts: (products: Product[]) => void;
  reset: () => void;
}

export const useProducts = create<ProductStore>()(
  persist(
    (set) => ({
      products: MOCK_PRODUCTS,
      addProducts: (newProducts) => set((state) => ({ 
        products: [...state.products, ...newProducts] 
      })),
      setProducts: (products) => set({ products }),
      reset: () => set({ products: MOCK_PRODUCTS }),
    }),
    {
      name: 'shopaholics-products-storage',
    }
  )
);