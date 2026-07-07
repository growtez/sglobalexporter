import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price_per_kg: number;
  quantity_kg: number;
  image_url: string;
  slug?: string;
  unit?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity_kg: number) => void;
  updateUnit: (id: string, unit: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity_kg: item.quantity_kg + newItem.quantity_kg }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...newItem, unit: newItem.unit || "Kilograms (kg)" }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity_kg) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity_kg } : item
          ),
        }));
      },
      updateUnit: (id, unit) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, unit } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => {
            let multiplier = 1;
            if (item.unit === "Metric Tons (MT)") {
              multiplier = 1000;
            } else if (item.unit === "Boxes") {
              multiplier = 10;
            }
            return total + item.price_per_kg * item.quantity_kg * multiplier;
          },
          0
        );
      },
    }),
    {
      name: 'sglobal-cart-storage',
    }
  )
);
