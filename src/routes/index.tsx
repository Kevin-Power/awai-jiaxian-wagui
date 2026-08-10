import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Star,
  Leaf,
  Flame,
  Heart,
  TrainFront,
  Users,
  Utensils,
  Instagram,
} from "lucide-react";
import { SiteHeader } from "@/components/shop/header";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { MenuSection } from "@/components/shop/menu-section";
import { OrderForm } from "@/components/shop/order-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MENU, REVIEWS, SHOP } from "@/data/menu";
import { images } from "@/assets/images";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const add = useCart((s) => s.add);
  const popular = MENU.filter((m) => m.popular).slice(0, 3);

  return (
    <div id="top" className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <CartDrawer />

      {/* Hero */}
      <section className="relative overflow-hidden pt-[calc(var(--grok-banner-h,0px)+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-12">
          <div className="animate-rise order-2 lg:order-1">
            <Badge variant="secondary" className="mb-4">
              高雄前鎮 · 復興三路 127 號
            </Badge>
            <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl lg:text-[3.05rem]">
              {SHOP.nameFull}
              <span className="mt-2 block text-2xl font-medium text-primary sm:text-3xl">
                {SHOP.tagline}
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
              堅持傳統工法，維持老一輩的味道。碗粿、肉粽、魚焿——每一口都是懷舊風味。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#menu">
                  看菜單
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href={SHOP.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="size-4" />
                  @{SHOP.instagram}
                </a>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { k: "傳承", v: "數十年" },
                { k: "營業", v: "06:30" },
                { k: "電話", v: "訂購" },
              ].map((stat) => (
                <div key={stat.k}>
                  <dt className="text-xs text-fg-subtle">{stat.k}</dt>
                  <dd className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-fg">
                    {stat.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise stagger-2 relative order-1 pb-10 lg:order-2 lg:pb-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img
                src={images.hero}
                alt="阿歪小吃店甲仙碗粿肉粽"
                className="aspect-[5/4] w-full object-cover sm:aspect-[4/3]"
                width={1176}
                height={784}
              />
            </div>
            <div className="absolute bottom-0 left-4 right-4 sm:left-auto sm:right-6 sm:w-64">
              <div className="rounded-xl border border-border bg-bg-elevated/95 p-4 shadow-card backdrop-blur-sm">
                <p className="text-xs font-medium tracking-wide text-primary">
                  官方 Instagram
                </p>
                <p className="mt-1 font-display text-base font-semibold">
                  @{SHOP.instagram}
                </p>
                <p className="mt-1 text-sm text-fg-muted">
                  店休、活動看這裡
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: Leaf,
              title: "傳統工法",
              desc: "堅持老一輩的味道，懷舊風味不偷工。",
            },
            {
              icon: Flame,
              title: "碗粿・肉粽・魚焿",
              desc: "官方主打三寶，早餐到午後都對味。",
            },
            {
              icon: Heart,
              title: "在地人情味",
              desc: "前鎮街坊一吃再吃，傳承數十年。",
            },
          ].map((f) => (
            <div key={f.title} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                <f.icon className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-medium text-fg">{f.title}</h3>
                <p className="mt-0.5 text-sm text-fg-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-widest text-primary uppercase">
                Bestsellers
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold">
                最受歡迎
              </h2>
            </div>
            <a
              href="#menu"
              className="inline-flex items-center gap-1 text-sm font-medium text-fg-muted transition-colors hover:text-primary"
            >
              完整菜單
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {popular.map((item) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {item.badge && (
                    <Badge className="absolute left-3 top-3 bg-bg-elevated/95 text-primary shadow-soft">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <span className="font-display text-lg font-semibold tabular-nums text-primary">
                      NT$ {item.price}
                      <span className="text-xs font-sans font-normal text-fg-muted">
                        {" "}
                        起
                      </span>
                    </span>
                    <Button type="button" size="sm" onClick={() => add(item)}>
                      加入
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MenuSection />

      {/* Story */}
      <section
        id="story"
        className="scroll-mt-24 border-t border-border bg-bg-subtle py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={images.shop}
              alt="阿歪小吃店古色古香用餐環境"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              Our story
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              阿歪小吃店
              <br />
              甲仙碗粿肉粽
            </h2>
            <p className="mt-5 leading-relaxed text-fg-muted">{SHOP.story}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={SHOP.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="size-4" />
                  追蹤 @{SHOP.instagram}
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={`tel:${SHOP.phoneTel}`}>訂購 {SHOP.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="border-t border-border bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              Tips
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              來店小提醒
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {SHOP.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-subtle font-display text-sm font-semibold text-primary tabular-nums">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-fg-muted">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              Reviews
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              店家與食客
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <blockquote
                key={r.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div
                  className="flex gap-0.5 text-primary"
                  aria-label={`${r.stars} 星`}
                >
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                  「{r.text}」
                </p>
                <footer className="mt-5 border-t border-border pt-4 text-sm">
                  <span className="font-medium text-fg">{r.name}</span>
                  <span className="text-fg-subtle"> · {r.area}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section
        id="visit"
        className="scroll-mt-24 border-t border-border bg-bg-elevated py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium tracking-widest text-primary uppercase">
                Visit us
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                歡迎來店
              </h2>
              <p className="mt-3 max-w-md text-fg-muted">
                店休與活動以官方 Instagram 最新貼文為準。
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <MapPin className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-sm text-fg-muted">{SHOP.address}</p>
                    <p className="text-xs text-fg-subtle">{SHOP.landmark}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <TrainFront className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">交通</p>
                    <p className="text-sm text-fg-muted">{SHOP.mrt}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <Phone className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">訂購專線</p>
                    <a
                      href={`tel:${SHOP.phoneTel}`}
                      className="text-sm text-fg-muted underline-offset-2 hover:text-primary hover:underline"
                    >
                      {SHOP.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <Instagram className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <a
                      href={SHOP.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-fg-muted underline-offset-2 hover:text-primary hover:underline"
                    >
                      @{SHOP.instagram}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <Clock className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">營業時間</p>
                    <ul className="mt-1 space-y-0.5 text-sm text-fg-muted">
                      {SHOP.hours.map((h) => (
                        <li key={h.days} className="flex flex-wrap gap-x-2">
                          <span>{h.days}</span>
                          <span className="tabular-nums text-fg">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <Users className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">座位</p>
                    <p className="text-sm text-fg-muted">
                      室內、室外皆有；高峰一位難求
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-primary">
                    <Utensils className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium">桌邊醬料</p>
                    <p className="text-sm text-fg-muted">
                      蒜泥、辣醬等，羹湯可自行加味
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.address + " 甲仙碗粿肉粽")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    開啟地圖
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={`tel:${SHOP.phoneTel}`}>立即來電</a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-bg-ink text-fg-on-ink shadow-card">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[360px]">
                <img
                  src={images.shop}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                  loading="lazy"
                />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 sm:min-h-[360px] sm:p-8">
                  <p className="text-sm text-fg-on-ink-muted">跟著官方帳號</p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-snug">
                    Instagram @{SHOP.instagram}
                  </p>
                  <p className="mt-3 max-w-sm text-sm text-fg-on-ink-muted">
                    店休日、節慶活動、最新消息都以 IG 貼文為準。訂購請電{" "}
                    {SHOP.phone}。
                  </p>
                  <Button asChild variant="secondary" className="mt-6 w-fit">
                    <a
                      href={SHOP.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram className="size-4" />
                      打開 Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderForm />

      {/* Footer */}
      <footer className="border-t border-border bg-bg py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-lg font-semibold">{SHOP.nameFull}</p>
            <p className="mt-1 text-sm text-fg-muted">{SHOP.tagline}</p>
            <p className="mt-3 text-sm text-fg-subtle">{SHOP.address}</p>
            <p className="text-sm text-fg-subtle">{SHOP.phone}</p>
            <a
              href={SHOP.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-primary"
            >
              <Instagram className="size-3.5" />
              @{SHOP.instagram}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            <a href="#menu" className="hover:text-fg">
              菜單
            </a>
            <a href="#story" className="hover:text-fg">
              故事
            </a>
            <a href="#visit" className="hover:text-fg">
              來店
            </a>
            <a href="#order" className="hover:text-fg">
              預訂
            </a>
            <a
              href={SHOP.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-border px-4 pt-6 sm:px-6">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {SHOP.name} · 高雄前鎮 ·
            非官方粉絲站示範 · 資訊參考店家公開 IG 與食記
          </p>
        </div>
      </footer>
    </div>
  );
}
