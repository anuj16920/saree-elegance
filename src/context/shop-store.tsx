import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { products, type Product } from "@/data/products";

type CartItem = { id: string; qty: number };
type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  cartProducts: { product: Product; qty: number }[];
  cartTotal: number;
  cartCount: number;
};

const ShopCtx = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("minni-cart");
      const w = localStorage.getItem("minni-wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("minni-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("minni-wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (id: string, qty = 1) =>
    setCart((c) => {
      const ex = c.find((i) => i.id === id);
      if (ex) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
  const removeFromCart = (id: string) => setCart((c) => c.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const toggleWishlist = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const clearCart = () => setCart([]);

  const cartProducts = cart
    .map((i) => {
      const p = products.find((p) => p.id === i.id);
      return p ? { product: p, qty: i.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];
  const cartTotal = cartProducts.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <ShopCtx.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, clearCart, cartProducts, cartTotal, cartCount }}>
      {children}
    </ShopCtx.Provider>
  );
}

export const useShop = () => {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be inside ShopProvider");
  return ctx;
};