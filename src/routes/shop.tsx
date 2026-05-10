import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Sarees — Minni Saree's" },
      { name: "description", content: "Browse our complete saree collection: Banarasi, Kanchipuram, silk, cotton & designer wear." },
    ],
  }),
  component: ShopPage,
});

const fabrics = [...new Set(products.map((p) => p.fabric))];
const colors = [...new Set(products.map((p) => p.color))];
const occasions = [...new Set(products.map((p) => p.occasion))];
const cats = [...new Set(products.map((p) => p.category))];

function ShopPage() {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState<string[]>([]);
  const [fab, setFab] = useState<string[]>([]);
  const [col, setCol] = useState<string[]>([]);
  const [occ, setOcc] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState("newest");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let r = products.filter((p) =>
      (cat.length === 0 || cat.includes(p.category)) &&
      (fab.length === 0 || fab.includes(p.fabric)) &&
      (col.length === 0 || col.includes(p.color)) &&
      (occ.length === 0 || occ.includes(p.occasion)) &&
      p.price <= maxPrice &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "popular") r = [...r].sort((a, b) => b.reviews - a.reviews);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [cat, fab, col, occ, maxPrice, sort, q]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-6 text-sm">
      <div>
        <h4 className="font-serif text-lg mb-3">Search</h4>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sarees..." className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-maroon" />
      </div>
      <FilterGroup title="Category" options={cats} selected={cat} onToggle={(v) => toggle(cat, setCat, v)} />
      <FilterGroup title="Fabric" options={fabrics} selected={fab} onToggle={(v) => toggle(fab, setFab, v)} />
      <FilterGroup title="Color" options={colors} selected={col} onToggle={(v) => toggle(col, setCol, v)} />
      <FilterGroup title="Occasion" options={occasions} selected={occ} onToggle={(v) => toggle(occ, setOcc, v)} />
      <div>
        <h4 className="font-serif text-lg mb-3">Max Price: ₹{maxPrice.toLocaleString("en-IN")}</h4>
        <input type="range" min={1000} max={30000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-maroon" />
      </div>
    </div>
  );

  return (
    <SiteLayout>
      <div className="bg-secondary/30 py-8 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground"><Link to="/">Home</Link> / Shop</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-2">All Sarees</h1>
          <p className="text-muted-foreground mt-1">{list.length} products</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-auto px-4 py-2 rounded-full border border-border text-sm bg-background">
              <option value="newest">Newest</option>
              <option value="popular">Popularity</option>
              <option value="rating">Best Rated</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
          {list.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No sarees match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-background overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl">Filters</h3>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {Filters}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function FilterGroup({ title, options, selected, onToggle }: { title: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <h4 className="font-serif text-lg mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 cursor-pointer hover:text-maroon">
            <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} className="accent-maroon" />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}