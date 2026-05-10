import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useShop } from "@/context/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Minni Saree's" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartProducts, updateQty, removeFromCart, cartTotal } = useShop();
  const shipping = cartTotal > 2999 ? 0 : 99;
  const total = cartTotal + shipping;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl mb-8">Your Cart</h1>
        {cartProducts.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="inline-block mt-5 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-4">
              {cartProducts.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                  <Link to="/product/$id" params={{ id: product.id }} className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden bg-secondary shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link to="/product/$id" params={{ id: product.id }} className="font-serif text-lg hover:text-maroon line-clamp-1">{product.name}</Link>
                    <p className="text-xs text-muted-foreground">{product.fabric} · {product.color}</p>
                    <p className="font-semibold text-maroon mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(product.id, qty - 1)}><MinusCircle className="w-5 h-5 text-maroon" /></button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)}><PlusCircle className="w-5 h-5 text-maroon" /></button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-28">
              <h2 className="font-serif text-xl mb-4">Order Summary</h2>
              <Row label="Subtotal" value={`₹${cartTotal.toLocaleString("en-IN")}`} />
              <Row label="Shipping" value={shipping === 0 ? "FREE" : `₹${shipping}`} />
              <Row label="Tax" value="Included" />
              <div className="border-t border-border my-4" />
              <Row label="Total" value={`₹${total.toLocaleString("en-IN")}`} bold />
              <Link to="/checkout" className="block text-center mt-6 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Proceed to Checkout</Link>
              <p className="text-[11px] text-muted-foreground text-center mt-3">Secure payments · Free returns within 7 days</p>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-1 text-sm ${bold ? "font-serif text-lg" : ""}`}>
      <span className={bold ? "text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}