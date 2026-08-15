import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
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

const salesData = [
  { day: "Mon", sales: 42000, orders: 118 },
  { day: "Tue", sales: 66000, orders: 152 },
  { day: "Wed", sales: 51000, orders: 131 },
  { day: "Thu", sales: 81000, orders: 178 },
  { day: "Fri", sales: 73500, orders: 165 },
  { day: "Sat", sales: 98000, orders: 204 },
  { day: "Sun", sales: 89000, orders: 191 },
];

const categoryData = [
  { name: "Silk", value: 38 },
  { name: "Wedding", value: 26 },
  { name: "Festive", value: 18 },
  { name: "Cotton", value: 11 },
  { name: "Designer", value: 7 },
];

const pieColors = ["var(--maroon)", "var(--gold-deep)", "var(--royal-red)", "var(--gold)", "var(--maroon-deep)"];

function ChartCard({ title, subtitle, delay = 0, children }: { title: string; subtitle?: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-border rounded-2xl p-6 hover-lift"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-lg">{title}</h3>
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </div>
      <div className="mt-5 h-56">{children}</div>
    </motion.div>
  );
}

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  color: "var(--foreground)",
} as const;

function Stat({ label, value, Icon, trend }: { label: string; value: string; Icon: any; trend?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-card border border-border rounded-2xl p-5 hover-lift"
    >
      <div className="flex items-center justify-between"><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><Icon className="w-4 h-4 text-maroon" /></div>
      <p className="font-serif text-3xl mt-2 text-maroon">{value}</p>
      {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
    </motion.div>
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
        <ChartCard title="Revenue" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ left: -10, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--maroon)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--maroon)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
              <Area type="monotone" dataKey="sales" stroke="var(--maroon)" strokeWidth={2.5} fill="url(#revFill)" animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders per day" subtitle="This week" delay={0.1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ left: -18, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--gold-deep)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--secondary)", opacity: 0.4 }} />
              <Bar dataKey="orders" fill="url(#barFill)" radius={[6, 6, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by category" subtitle="Share %" delay={0.15}>
          <div className="flex items-center h-full gap-4">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={3} stroke="none" animationDuration={1200}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex-1 space-y-2">
              {categoryData.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                  <span className="flex-1 text-muted-foreground">{c.name}</span>
                  <span className="font-medium">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="font-serif text-lg">Top Sellers</h3>
          <div className="mt-4 space-y-3">
            {products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <img src={p.image} alt="" className="w-10 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (p.reviews / 3))}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.08 }}
                      className="h-full bg-gradient-royal"
                    />
                  </div>
                </div>
                <p className="text-sm font-semibold text-maroon">₹{p.price.toLocaleString("en-IN")}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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