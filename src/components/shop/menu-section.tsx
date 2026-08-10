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
  side: "小食",
};

function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);

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
          <p className="shrink-0 font-display text-lg font-semibold tabular-nums text-primary">
            {item.price}
            <span className="ml-0.5 text-xs font-sans font-normal text-fg-muted">
              元起
            </span>
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-fg-muted">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <Badge variant="secondary">{CATEGORY_LABEL[item.category]}</Badge>
          <Button
            type="button"
            size="sm"
            onClick={() => add(item)}
            aria-label={`加入 ${item.name}`}
          >
            <Plus className="size-4" />
            加入
          </Button>
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
            菜單
          </h2>
          <p className="mt-3 text-fg-muted">{SHOP.note}</p>
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
      </div>
    </section>
  );
}
