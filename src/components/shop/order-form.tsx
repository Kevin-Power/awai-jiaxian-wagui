import { useState } from "react";
import { CheckCircle2, Clock, MapPin, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP } from "@/data/menu";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  pickup: string;
  note: string;
};

const empty: FormState = { name: "", phone: "", pickup: "today-am", note: "" };

export function OrderForm() {
  const lines = useCart((s) => s.lines);
  const totalPrice = useCart((s) => s.totalPrice());
  const clear = useCart((s) => s.clear);
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate() {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "請填寫姓名";
    if (!/^09\d{8}$/.test(form.phone.replace(/\s|-/g, "")))
      next.phone = "請填寫正確手機（09 開頭）";
    if (lines.length === 0) next.note = "請先從菜單加入品項";
    setErrors(next);
    return Object.keys(next).length === 0 && lines.length > 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    clear();
    setForm(empty);
  }

  if (submitted) {
    return (
      <section
        id="order"
        className="scroll-mt-24 bg-bg-ink py-20 text-fg-on-ink sm:py-24"
      >
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <CheckCircle2
            className="mx-auto size-12 text-fg-on-ink"
            strokeWidth={1.5}
          />
          <h2 className="mt-4 font-display text-3xl font-semibold">
            預訂已送出
          </h2>
          <p className="mt-3 text-fg-on-ink-muted leading-relaxed">
            這是示範預訂。實際請電{" "}
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="underline underline-offset-2"
            >
              {SHOP.phone}
            </a>
            ，或看{" "}
            <a
              href={SHOP.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              @{SHOP.instagram}
            </a>{" "}
            是否營業。
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-8"
            onClick={() => setSubmitted(false)}
          >
            再訂一次
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="order"
      className="scroll-mt-24 bg-bg-ink py-20 text-fg-on-ink sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium tracking-widest text-fg-on-ink-muted uppercase">
            Pre-order
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            線上預訂
          </h2>
          <p className="mt-3 max-w-md text-fg-on-ink-muted leading-relaxed">
            填寫後到店自取。實際訂購請打訂購專線；店休請看 IG。
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-fg-on-ink-muted" />
              <span>{SHOP.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-fg-on-ink-muted" />
              <a href={`tel:${SHOP.phoneTel}`} className="hover:underline">
                {SHOP.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Instagram className="mt-0.5 size-4 shrink-0 text-fg-on-ink-muted" />
              <a
                href={SHOP.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                @{SHOP.instagram}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-fg-on-ink-muted" />
              <span>06:30 – 15:00（週四、五公休）</span>
            </li>
          </ul>

          {lines.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-bg-ink-soft p-5">
              <p className="text-sm text-fg-on-ink-muted">本次品項</p>
              <ul className="mt-3 space-y-2 text-sm">
                {lines.map((l) => (
                  <li key={l.id} className="flex justify-between gap-3">
                    <span>
                      {l.name}
                      {l.options && l.options.length > 0 && (
                        <span className="text-fg-on-ink-muted">
                          （{l.options.join("・")}）
                        </span>
                      )}{" "}
                      × {l.qty}
                    </span>
                    <span className="tabular-nums">NT$ {l.price * l.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-medium">
                <span>合計（參考）</span>
                <span className="tabular-nums">NT$ {totalPrice}</span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-bg-elevated p-6 text-fg shadow-card sm:p-8"
          noValidate
        >
          <div className="space-y-5">
            <Field label="姓名" error={errors.name} htmlFor="order-name">
              <input
                id="order-name"
                className={inputClass(!!errors.name)}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="怎麼稱呼您"
                autoComplete="name"
              />
            </Field>

            <Field label="手機" error={errors.phone} htmlFor="order-phone">
              <input
                id="order-phone"
                className={inputClass(!!errors.phone)}
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="09xxxxxxxx"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>

            <Field label="希望取餐時段" htmlFor="order-pickup">
              <select
                id="order-pickup"
                className={inputClass(false)}
                value={form.pickup}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pickup: e.target.value }))
                }
              >
                <option value="today-am">今天 早上（06:30–10:00）</option>
                <option value="today-late-am">今天 午前（10:00–12:00）</option>
                <option value="today-noon">今天 中午後（12:00–15:00）</option>
                <option value="tomorrow-am">下次營業日 早上</option>
              </select>
            </Field>

            <Field label="備註" error={errors.note} htmlFor="order-note">
              <textarea
                id="order-note"
                className={cn(inputClass(!!errors.note), "min-h-24 resize-y")}
                value={form.note}
                onChange={(e) =>
                  setForm((f) => ({ ...f, note: e.target.value }))
                }
                placeholder="例如：羹配米粉、外帶…"
              />
            </Field>

            {lines.length === 0 && (
              <p className="rounded-lg bg-bg-subtle px-3 py-2 text-sm text-fg-muted">
                購物袋是空的——先到{" "}
                <a
                  href="#menu"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  菜單
                </a>{" "}
                加入品項。
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              送出預訂（示範）
            </Button>
            <p className="text-center text-xs text-fg-subtle">
              示範表單不會通知店家。請電 {SHOP.phone} 或追蹤 @
              {SHOP.instagram}。
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-fg"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-primary">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-primary focus:ring-2 focus:ring-primary/20",
    hasError ? "border-primary" : "border-border",
  );
}
