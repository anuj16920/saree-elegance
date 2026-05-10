import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useShop } from "@/context/shop-store";

export function MobileBottomNav() {
  const { cartCount } = useShop();
  const items = [
    { to: "/" as const, icon: Home, label: "Home" },
    { to: "/shop" as const, icon: Search, label: "Shop" },
    { to: "/wishlist" as const, icon: Heart, label: "Wish" },
    { to: "/cart" as const, icon: ShoppingBag, label: "Cart", badge: cartCount },
    { to: "/profile" as const, icon: User, label: "Me" },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border">
      <div className="grid grid-cols-5 py-2">
        {items.map(({ to, icon: Icon, label, badge }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 text-[11px] py-1 relative"
            activeProps={{ className: "text-maroon" }} activeOptions={{ exact: to === "/" }}>
            <div className="relative">
              <Icon className="w-5 h-5" />
              {!!badge && badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-gradient-gold text-[9px] font-semibold rounded-full w-3.5 h-3.5 grid place-items-center text-maroon-deep">{badge}</span>
              )}
            </div>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}