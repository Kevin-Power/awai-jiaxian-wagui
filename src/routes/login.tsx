import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { SHOP } from "@/data/menu";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-4 py-16">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="text-center">
          <p className="font-display text-xl font-semibold">{SHOP.name}</p>
          <h1 className="mt-2 text-lg font-medium text-fg">會員登入</h1>
          <p className="mt-1 text-sm text-fg-muted">登入後可管理預訂紀錄</p>
        </div>
        {authEnabled ? (
          <div className="space-y-3">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                使用 {p.label} 繼續
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-fg-muted">目前未開放登入</p>
        )}
        <Link
          to="/"
          className="block text-center text-sm text-fg-muted underline-offset-2 hover:text-fg hover:underline"
        >
          返回首頁
        </Link>
      </div>
    </main>
  );
}
