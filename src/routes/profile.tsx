import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, MapPin, Heart, LogOut, Settings } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { products } from "@/data/products";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Account — Minni Saree's" }] }),
  component: ProfilePage,
});

const tabs = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "addresses", label: "Addresses", Icon: MapPin },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "settings", label: "Settings", Icon: Settings },
] as const;

function ProfilePage() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("overview");
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-card border border-border rounded-2xl p-5 h-fit">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-gradient-gold grid place-items-center text-maroon-deep font-serif text-lg">P</div>
            <div><p className="font-serif text-lg leading-tight">Priya R.</p><p className="text-xs text-muted-foreground">priya@minni.com</p></div>
          </div>
          <nav className="mt-3 space-y-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${tab === t.id ? "bg-maroon text-cream" : "hover:bg-secondary"}`}>
                <t.Icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-secondary text-muted-foreground"><LogOut className="w-4 h-4" /> Logout</button>
          </nav>
        </aside>

        <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {tab === "overview" && (
            <div>
              <h1 className="font-serif text-3xl">Welcome back, Priya 🌸</h1>
              <p className="text-muted-foreground mt-1">Here's a quick view of your account.</p>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[["12", "Total Orders"], ["3", "Wishlist"], ["₹42,800", "Lifetime"]].map(([n, l]) => (
                  <div key={l} className="rounded-xl border border-border p-5 bg-secondary/30">
                    <p className="font-serif text-2xl text-maroon">{n}</p>
                    <p className="text-xs text-muted-foreground mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "orders" && (
            <div>
              <h2 className="font-serif text-2xl mb-5">My Orders</h2>
              <div className="space-y-3">
                {products.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="flex gap-4 p-4 border border-border rounded-xl">
                    <img src={p.image} alt="" className="w-16 h-20 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Order #MN{1000 + i} · ₹{p.price.toLocaleString("en-IN")}</p>
                      <span className="inline-block mt-2 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Delivered</span>
                    </div>
                    <Link to="/track" className="text-xs text-maroon self-center">Track</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "addresses" && (
            <div>
              <h2 className="font-serif text-2xl mb-5">Saved Addresses</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-border rounded-xl p-5">
                  <p className="font-semibold">Home</p>
                  <p className="text-sm text-muted-foreground mt-1">Plot 12, Banjara Hills, Hyderabad — 500034</p>
                </div>
                <button className="border-2 border-dashed border-border rounded-xl p-5 text-muted-foreground hover:border-maroon hover:text-maroon">+ Add new address</button>
              </div>
            </div>
          )}
          {tab === "wishlist" && <p className="text-muted-foreground"><Link to="/wishlist" className="text-maroon underline">Open wishlist →</Link></p>}
          {tab === "settings" && <p className="text-muted-foreground">Update your name, email, password & preferences.</p>}
        </section>
      </div>
    </SiteLayout>
  );
}