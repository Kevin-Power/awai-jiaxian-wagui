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
  add: (item: MenuItem, opts?: { qty?: number; size?: "small" | "large" }) => void;
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
      add: (item, opts) => {
        const qty = opts?.qty ?? 1;
        const size = opts?.size ?? "small";
        const isLarge = size === "large" && item.priceLarge != null;
        const price = isLarge ? (item.priceLarge as number) : item.price;
        const lineId = isLarge ? `${item.id}-l` : item.id;
        const name = isLarge ? `${item.name}（大）` : item.priceLarge != null ? `${item.name}（小）` : item.name;

        set((state) => {
          const existing = state.lines.find((l) => l.id === lineId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === lineId ? { ...l, qty: l.qty + qty } : l,
              ),
              open: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                id: lineId,
                name,
                price,
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
    { name: "awai-wagui-cart-v2" },
  ),
);
