import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useShop } from "@/context/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Minni Saree's" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl mb-8">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/shop" className="inline-block mt-5 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Browse Sarees</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}