import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP } from "@/data/menu";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#menu", label: "菜單" },
  { href: "#story", label: "故事" },
  { href: "#reviews", label: "評價" },
  { href: "#visit", label: "來店" },
  { href: "#order", label: "預訂" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalQty = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const setCartOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-40 transition-all duration-200",
        "top-[var(--grok-banner-h,0px)]",
        scrolled
          ? "border-b border-border bg-bg/90 shadow-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg-ink text-xs font-medium tracking-wide text-fg-on-ink">
            阿歪
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold leading-tight text-fg">
              {SHOP.nameShort}
            </span>
            <span className="hidden text-xs text-fg-muted sm:block">
              甲仙碗粿肉粽
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={SHOP.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
            aria-label="Instagram @a_wai_127"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={`tel:${SHOP.phoneTel}`}
            className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm text-fg-muted transition-colors hover:text-fg lg:inline-flex"
            aria-label="電話訂購"
          >
            <Phone className="size-4" />
            <span className="tabular-nums">{SHOP.phone}</span>
          </a>
          <Button
            type="button"
            variant="ink"
            size="sm"
            className="relative"
            onClick={() => setCartOpen(true)}
            aria-label="打開購物袋"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">購物袋</span>
            {totalQty > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold tabular-nums text-primary-fg">
                {totalQty}
              </span>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "關閉選單" : "打開選單"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg-elevated md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base text-fg transition-colors hover:bg-bg-subtle"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={SHOP.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-3 text-base text-fg-muted"
              onClick={() => setMobileOpen(false)}
            >
              <Instagram className="size-4" />
              @{SHOP.instagram}
            </a>
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-base text-fg-muted"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="size-4" />
              {SHOP.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
