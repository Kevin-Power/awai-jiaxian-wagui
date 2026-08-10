import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CILANTRO_LABEL, type MenuItem, type SoupStaple } from "@/data/menu";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  /** 主食選擇（僅羹湯）。「不搭主食」代表只要湯。 */
  staple?: SoupStaple;
  /** 是否加香菜。 */
  cilantro?: boolean;
  /** 給購物袋顯示用的備註，例如 ["米粉", "加香菜"]。 */
  options?: string[];
};

export type AddOptions = {
  qty?: number;
  size?: "small" | "large";
  staple?: SoupStaple;
  cilantro?: boolean;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: MenuItem, opts?: AddOptions) => void;
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
        const name = isLarge ? `${item.name}（大）` : item.priceLarge != null ? `${item.name}（小）` : item.name;

        // 只有支援該選項的品項才記錄，避免產生無意義的分行。
        const staple = item.staples ? (opts?.staple ?? "米粉") : undefined;
        const cilantro = item.cilantro ? (opts?.cilantro ?? false) : undefined;

        const options = [
          ...(staple ? [staple] : []),
          ...(cilantro ? [CILANTRO_LABEL] : []),
        ];

        // 不同的搭配要各自成行，才不會把「米粉」跟「不搭主食」併成同一筆。
        const lineId = [
          item.id,
          isLarge ? "l" : "s",
          staple ?? "",
          cilantro ? "co" : "",
        ]
          .filter(Boolean)
          .join("-");

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
                staple,
                cilantro,
                options,
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
    // v3：line id 加入主食／香菜選項，舊資料的 id 格式已不同，直接換 key 重來。
    { name: "awai-wagui-cart-v3" },
  ),
);
