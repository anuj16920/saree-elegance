import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Image as ImageIcon, TrendingUp, IndianRupee } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { products } from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Minni Saree's" }] }),
  component: AdminPage,
});

const nav = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "products", label: "Products", Icon: Package },
  { id: "orders", label: "Orders", Icon: ShoppingCart },
  { id: "customers", label: "Customers", Icon: Users },
  { id: "coupons", label: "Coupons", Icon: Tag },
  { id: "banners", label: "Banners", Icon: ImageIcon },
] as const;

function AdminPage() {
  const [tab, setTab] = useState<typeof nav[number]["id"]>("dashboard");

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-card border border-border rounded-2xl p-4 h-fit">
          <p className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-2">Admin Panel</p>
          <nav className="space-y-1 mt-1">
            {nav.map((n) => (
              <button key={n.id} onClick={() => setTab(n.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${tab === n.id ? "bg-maroon text-cream" : "hover:bg-secondary"}`}>
                <n.Icon className="w-4 h-4" /> {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <section>
          {tab === "dashboard" && <Dashboard />}
          {tab === "products" && <ProductsAdmin />}
          {tab === "orders" && <OrdersAdmin />}
          {tab === "customers" && <CustomersAdmin />}
          {tab === "coupons" && <CouponsAdmin />}
          {tab === "banners" && <BannersAdmin />}
        </section>
      </div>
    </SiteLayout>
  );
}

function Stat({ label, value, Icon, trend }: { label: string; value: string; Icon: any; trend?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><Icon className="w-4 h-4 text-maroon" /></div>
      <p className="font-serif text-3xl mt-2 text-maroon">{value}</p>
      {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue" value="₹4,82,300" Icon={IndianRupee} trend="+12.4% vs last month" />
        <Stat label="Orders" value="1,284" Icon={ShoppingCart} trend="+8.1%" />
        <Stat label="Customers" value="3,902" Icon={Users} trend="+22 today" />
        <Stat label="Conversion" value="3.8%" Icon={TrendingUp} trend="+0.4%" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-serif text-lg">Sales (Last 7 days)</h3>
          <div className="flex items-end gap-2 h-40 mt-5">
            {[40, 65, 50, 80, 72, 95, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-royal rounded-t-md" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-serif text-lg">Top Sellers</h3>
          <div className="mt-4 space-y-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="w-10 h-12 rounded object-cover" />
                <div className="flex-1"><p className="text-sm font-medium line-clamp-1">{p.name}</p><p className="text-xs text-muted-foreground">{p.reviews} sold</p></div>
                <p className="text-sm font-semibold text-maroon">₹{p.price.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Products</h1>
        <button className="px-5 py-2.5 rounded-full bg-gradient-royal text-primary-foreground text-sm font-semibold">+ Add Product</button>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4 flex items-center gap-3"><img src={p.image} alt="" className="w-10 h-12 rounded object-cover" /><span className="font-medium">{p.name}</span></td>
                <td>{p.category}</td>
                <td>₹{p.price.toLocaleString("en-IN")}</td>
                <td><span className={`px-2 py-0.5 rounded-full text-xs ${p.stock > 10 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{p.stock}</span></td>
                <td className="pr-4 text-right"><button className="text-maroon text-xs">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersAdmin() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6">Orders</h1>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {[["#MN1284", "Aanya S.", "₹8,499", "Delivered"], ["#MN1283", "Lakshmi I.", "₹12,999", "Shipped"], ["#MN1282", "Priya R.", "₹3,499", "Processing"], ["#MN1281", "Riya M.", "₹18,999", "Pending"]].map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-4 font-medium">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                <td><span className="px-2 py-0.5 rounded-full text-xs bg-secondary">{r[3]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomersAdmin() {
  return <div><h1 className="font-serif text-3xl mb-6">Customers</h1><div className="bg-card border border-border rounded-2xl p-6 text-muted-foreground">3,902 customers · CRM coming soon.</div></div>;
}
function CouponsAdmin() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6">Coupons</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {[["FESTIVE40", "40% off festive collection"], ["WELCOME10", "10% off first order"], ["FREESHIP", "Free shipping"]].map(([c, d]) => (
          <div key={c} className="border border-dashed border-gold rounded-xl p-5 bg-gradient-gold/10">
            <p className="font-serif text-xl text-maroon">{c}</p>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function BannersAdmin() {
  return <div><h1 className="font-serif text-3xl mb-6">Banners</h1><div className="bg-card border border-border rounded-2xl p-6 text-muted-foreground">Manage homepage and category banners.</div></div>;
}