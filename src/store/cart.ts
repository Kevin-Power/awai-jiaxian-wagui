import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/data/menu";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: MenuItem, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (item, qty = 1) => {
        set((state) => {
          const existing = state.lines.find((l) => l.id === item.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === item.id ? { ...l, qty: l.qty + qty } : l,
              ),
              open: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                qty,
                image: item.image,
              },
            ],
            open: true,
          };
        });
      },
      remove: (id) =>
        set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.id !== id)
              : state.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      totalQty: () => get().lines.reduce((n, l) => n + l.qty, 0),
      totalPrice: () => get().lines.reduce((n, l) => n + l.price * l.qty, 0),
    }),
    { name: "awai-wagui-cart" },
  ),
);
