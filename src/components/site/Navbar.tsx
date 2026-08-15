import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/context/shop-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "glass shadow-soft" : "bg-background"}`}>
      <div className="bg-gradient-royal text-primary-foreground text-xs py-2 text-center px-4">
        ✨ Free shipping on orders above ₹2999 · Festive Sale Live · COD available
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu className="w-6 h-6" /></button>

        <Link to="/" className="font-serif text-2xl md:text-3xl font-semibold tracking-wide">
          <span className="text-maroon">Minni</span>{" "}
          <span className="text-gradient-gold italic">Saree's</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium hover:text-maroon transition-colors relative"
              activeProps={{ className: "text-maroon" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <button aria-label="Search" className="p-2 hover:text-maroon transition-colors"><Search className="w-5 h-5" /></button>
          <button aria-label="Toggle theme" onClick={() => setDark((d) => !d)} className="p-2 hover:text-maroon transition-colors hidden sm:block">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/wishlist" className="p-2 hover:text-maroon transition-colors relative" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <Link to="/login" className="p-2 hover:text-maroon transition-colors hidden sm:block" aria-label="Account"><User className="w-5 h-5" /></Link>
          <Link to="/cart" className="p-2 hover:text-maroon transition-colors relative" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-background shadow-elegant p-6 animate-in slide-in-from-left">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-xl text-maroon">Minni Saree's</span>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="text-base font-medium py-2 border-b border-border">{l.label}</Link>
              ))}
              <Link to="/login" className="text-base font-medium py-2 border-b border-border">Login / Signup</Link>
              <Link to="/profile" className="text-base font-medium py-2 border-b border-border">My Account</Link>
              <Link to="/track" className="text-base font-medium py-2 border-b border-border">Track Order</Link>
              <Link to="/admin" className="text-base font-medium py-2 border-b border-border">Admin</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 bg-gradient-gold text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center text-maroon-deep">
      {n}
    </span>
  );
}