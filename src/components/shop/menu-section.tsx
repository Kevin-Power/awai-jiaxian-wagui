import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_LABEL,
  MENU,
  SHOP,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

const TABS: Array<MenuCategory | "all"> = [
  "all",
  "wagui",
  "zongzi",
  "soup",
  "side",
];

const TAB_LABEL: Record<(typeof TABS)[number], string> = {
  all: "全部",
  wagui: "碗粿",
  zongzi: "肉粽",
  soup: "羹湯",
  side: "湯品／炸魚",
};

function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const hasSize = item.priceLarge != null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-200 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-[1.03]"
          loading="lazy"
        />
        {item.badge && (
          <Badge className="absolute left-3 top-3 bg-bg-elevated/95 text-primary shadow-soft backdrop-blur-sm">
            {item.badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-snug text-fg">
              {item.name}
            </h3>
            <p className="mt-0.5 text-xs tracking-wide text-fg-subtle">
              {item.nameEn}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {hasSize ? (
              <>
                <p className="font-display text-base font-semibold tabular-nums text-primary">
                  小 {item.price}
                  <span className="ml-0.5 text-xs font-sans font-normal text-fg-muted">
                    元
                  </span>
                </p>
                <p className="font-display text-base font-semibold tabular-nums text-primary">
                  大 {item.priceLarge}
                  <span className="ml-0.5 text-xs font-sans font-normal text-fg-muted">
                    元
                  </span>
                </p>
              </>
            ) : (
              <p className="font-display text-lg font-semibold tabular-nums text-primary">
                {item.price}
                <span className="ml-0.5 text-xs font-sans font-normal text-fg-muted">
                  元
                </span>
              </p>
            )}
          </div>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-fg-muted">
          {item.description}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <Badge variant="secondary">{CATEGORY_LABEL[item.category]}</Badge>
          {hasSize ? (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => add(item, { size: "small" })}
                aria-label={`加入 ${item.name} 小`}
              >
                <Plus className="size-4" />
                小
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => add(item, { size: "large" })}
                aria-label={`加入 ${item.name} 大`}
              >
                <Plus className="size-4" />
                大
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={() => add(item)}
              aria-label={`加入 ${item.name}`}
            >
              <Plus className="size-4" />
              加入
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function MenuSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");

  const items = useMemo(
    () => (tab === "all" ? MENU : MENU.filter((m) => m.category === tab)),
    [tab],
  );

  return (
    <section id="menu" className="scroll-mt-24 bg-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-widest text-primary uppercase">
            Menu
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-fg sm:text-4xl">
            菜單價目
          </h2>
          <p className="mt-3 text-fg-muted">{SHOP.note}</p>
          <p className="mt-2 text-sm text-fg-subtle">
            羹湯可搭配：{SHOP.soupNoodles.join("、")}
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="菜單分類"
        >
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-bg-ink text-fg-on-ink"
                  : "bg-bg-elevated text-fg-muted ring-1 ring-border hover:bg-bg-subtle hover:text-fg",
              )}
              onClick={() => setTab(t)}
            >
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Price board mirror */}
        <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border bg-bg-ink px-5 py-3 text-center">
            <p className="font-display text-lg font-semibold text-fg-on-ink">
              碗粿・肉粽 價目表
            </p>
            <p className="text-xs text-fg-on-ink-muted">依店內菜單看板</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-2">
            {[
              ["碗粿", "35"],
              ["蔬活湯", "65"],
              ["肉粽", "55"],
              ["單點炸魚", "75"],
              ["花生粽", "45"],
              ["", ""],
            ]
              .filter(([a]) => a)
              .map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between bg-card px-4 py-3 text-sm"
                >
                  <span className="font-medium">{name}</span>
                  <span className="tabular-nums text-primary font-semibold">
                    {price}
                  </span>
                </div>
              ))}
          </div>
          <div className="border-t border-border px-4 py-4">
            <p className="mb-3 text-center text-xs font-medium text-fg-muted">
              羹湯（可選米粉／麵／米粉麵）
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-center text-sm">
                <thead>
                  <tr className="text-fg-muted">
                    <th className="py-2 font-medium">名稱</th>
                    <th className="py-2 font-medium">小</th>
                    <th className="py-2 font-medium">大</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  <tr className="border-t border-border">
                    <td className="py-2.5 font-medium">肉羹</td>
                    <td className="py-2.5 text-primary font-semibold">65</td>
                    <td className="py-2.5 text-primary font-semibold">75</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-2.5 font-medium">魚羹</td>
                    <td className="py-2.5 text-primary font-semibold">70</td>
                    <td className="py-2.5 text-primary font-semibold">90</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-2.5 font-medium">綜合羹</td>
                    <td className="py-2.5 text-primary font-semibold">75</td>
                    <td className="py-2.5 text-primary font-semibold">95</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
