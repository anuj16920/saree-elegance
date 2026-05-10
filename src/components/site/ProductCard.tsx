import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useShop } from "@/context/shop-store";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWish = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden hover-lift border border-border"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block relative aspect-[4/5] overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-festive text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        {product.newArrival && <span className="absolute top-3 right-12 bg-cream text-maroon text-[10px] font-semibold px-2 py-1 rounded">NEW</span>}
      </Link>
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="wishlist"
        className={`absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur-md transition-all ${isWish ? "bg-maroon text-cream" : "bg-background/80 text-foreground hover:bg-maroon hover:text-cream"}`}
      >
        <Heart className={`w-4 h-4 ${isWish ? "fill-current" : ""}`} />
      </button>

      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-serif text-lg leading-snug mt-1 line-clamp-1 group-hover:text-maroon transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="font-serif text-xl font-semibold text-maroon">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="ml-2 text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={() => addToCart(product.id)} aria-label="add to cart"
            className="w-9 h-9 rounded-full bg-gradient-royal text-primary-foreground grid place-items-center hover:scale-110 transition-transform">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}