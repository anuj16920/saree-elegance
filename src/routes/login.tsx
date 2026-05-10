import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-saree.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Minni Saree's" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant relative">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-cream">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Welcome to</p>
            <h2 className="font-serif text-4xl mt-2">Minni Saree's</h2>
            <p className="text-cream/80 text-sm mt-2">Sign in to access your wishlist, orders & exclusive drops.</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
          <div className="flex border-b border-border mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-medium capitalize ${tab === t ? "text-maroon border-b-2 border-maroon" : "text-muted-foreground"}`}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {tab === "signup" && <Field label="Full Name" />}
            <Field label="Email or Phone" />
            <Field label="Password" type="password" />
            {tab === "login" && <p className="text-xs text-right"><Link to="/login" className="text-maroon">Forgot password?</Link></p>}
            <button className="w-full px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">
              {tab === "login" ? "Login" : "Create Account"}
            </button>
            <div className="relative my-3"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div><span className="relative bg-card px-3 mx-auto block w-fit text-xs text-muted-foreground">or continue with</span></div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="px-4 py-2.5 rounded-full border border-border text-sm">Google</button>
              <button type="button" className="px-4 py-2.5 rounded-full border border-border text-sm">Phone OTP</button>
            </div>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input type={type} className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-maroon text-sm" />
    </div>
  );
}