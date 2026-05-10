import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, RefreshCcw, Share2, MinusCircle, PlusCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { findProduct, products } from "@/data/products";
import { useShop } from "@/context/shop-store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Minni Saree's` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Free Size");
  const isWish = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const deliveryDate = new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <p className="text-xs text-muted-foreground"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.category} / <span className="text-foreground">{product.name}</span></p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-10">
        {/* GALLERY */}
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <div className="space-y-3">
            {product.gallery.map((g: string, i: number) => (
              <button key={i} onClick={() => setImg(i)} className={`block w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${img === i ? "border-maroon" : "border-transparent opacity-60"}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary group">
            <img src={product.gallery[img]} alt={product.name} className="w-full h-full object-cover group-hover:scale-150 transition-transform duration-500 cursor-zoom-in" />
            {discount > 0 && <span className="absolute top-4 left-4 bg-gradient-festive text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">{discount}% OFF</span>}
          </motion.div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-maroon">{product.category} · {product.fabric}</p>
          <h1 className="font-serif text-3xl md:text-4xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-gold text-maroon-deep rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" /> {product.rating}
            </div>
            <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-emerald-700 dark:text-emerald-400">In stock ({product.stock})</span>
          </div>

          <div className="flex items-end gap-3 mt-5">
            <span className="font-serif text-4xl font-semibold text-maroon">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Save {discount}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Color: <span className="text-muted-foreground">{product.color}</span></p>
            <div className="flex gap-2">
              {[product.color, "Gold", "Maroon"].map((c) => (
                <button key={c} className="px-4 py-2 rounded-full border border-border text-xs hover:border-maroon">{c}</button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-5">
            <p className="text-sm font-medium mb-2">Blouse Size: <span className="text-muted-foreground">{size}</span></p>
            <div className="flex flex-wrap gap-2">
              {["Free Size", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-full border text-xs ${size === s ? "border-maroon bg-maroon text-cream" : "border-border hover:border-maroon"}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><MinusCircle className="w-6 h-6 text-maroon" /></button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)}><PlusCircle className="w-6 h-6 text-maroon" /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button onClick={() => addToCart(product.id, qty)} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-maroon text-maroon font-semibold hover:bg-maroon hover:text-cream transition-colors">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <Link to="/checkout" onClick={() => addToCart(product.id, qty)} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-royal text-primary-foreground font-semibold shadow-elegant">
              <Zap className="w-4 h-4" /> Buy Now
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => toggleWishlist(product.id)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm ${isWish ? "border-maroon bg-maroon text-cream" : "border-border"}`}>
              <Heart className={`w-4 h-4 ${isWish ? "fill-current" : ""}`} /> Wishlist
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm"><Share2 className="w-4 h-4" /> Share</button>
          </div>

          {/* Delivery */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              [Truck, "Delivery", `By ${deliveryDate}`],
              [ShieldCheck, "COD", "Available"],
              [RefreshCcw, "Returns", "7 days"],
            ].map(([Icon, t, d], i) => (
              <div key={i} className="rounded-xl border border-border p-3 text-center">
                {/* @ts-ignore */}
                <Icon className="w-5 h-5 mx-auto text-maroon" />
                <p className="text-xs font-semibold mt-1">{t as string}</p>
                <p className="text-[11px] text-muted-foreground">{d as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description / Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <h2 className="font-serif text-2xl mb-6">Product Details</h2>
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          {[["Fabric", product.fabric], ["Color", product.color], ["Occasion", product.occasion], ["Length", "5.5m + 0.8m blouse"], ["Care", "Dry clean only"], ["Origin", "India"]].map(([k, v]) => (
            <div key={k as string} className="flex justify-between border-b border-border py-2">
              <dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-serif text-3xl mb-8 text-center">You May Also Love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}