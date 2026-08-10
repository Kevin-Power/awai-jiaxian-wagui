import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const totalPrice = useCart((s) => s.totalPrice());
  const clear = useCart((s) => s.clear);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-bg-ink/40 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-bg-elevated shadow-card transition-transform duration-250 ease-[var(--ease-smooth)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="購物袋"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold">購物袋</h2>
            <p className="text-sm text-fg-muted">到店自取或來電確認</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="關閉"
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full min-h-48 flex-col items-center justify-center gap-2 text-center">
              <p className="font-medium text-fg">還沒有選購</p>
              <p className="max-w-xs text-sm text-fg-muted">
                從菜單加入肉粽或碗粿，再到店自取。
              </p>
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => {
                  setOpen(false);
                  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                查看菜單
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <img
                    src={line.image}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-medium">{line.name}</p>
                      <button
                        type="button"
                        className="text-fg-subtle transition-colors hover:text-primary"
                        onClick={() => remove(line.id)}
                        aria-label={`移除 ${line.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {line.options && line.options.length > 0 && (
                      <p className="mt-0.5 text-xs text-fg-subtle">
                        {line.options.join("・")}
                      </p>
                    )}
                    <p className="mt-0.5 text-sm tabular-nums text-fg-muted">
                      NT$ {line.price}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg hover:bg-bg-subtle"
                        onClick={() => setQty(line.id, line.qty - 1)}
                        aria-label="減少"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums font-medium">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg hover:bg-bg-subtle"
                        onClick={() => setQty(line.id, line.qty + 1)}
                        aria-label="增加"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <span className="ml-auto text-sm font-medium tabular-nums">
                        NT$ {line.price * line.qty}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-fg-muted">合計</span>
              <span className="font-display text-xl font-semibold tabular-nums">
                NT$ {totalPrice}
              </span>
            </div>
            <Button
              type="button"
              className="w-full"
              size="lg"
              onClick={() => {
                setOpen(false);
                document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              填寫預訂資訊
            </Button>
            <button
              type="button"
              className="mt-2 w-full py-2 text-center text-xs text-fg-subtle hover:text-fg-muted"
              onClick={() => clear()}
            >
              清空購物袋
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
