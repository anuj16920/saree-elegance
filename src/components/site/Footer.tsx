import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-maroon-deep text-cream mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl"><span className="text-gradient-gold">Minni Saree's</span></h3>
          <p className="mt-4 text-sm text-cream/80 leading-relaxed">
            Heritage handcrafted sarees for the modern Indian woman. Woven with love, worn with pride.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full border border-cream/20 grid place-items-center hover:bg-gradient-gold hover:text-maroon-deep hover:border-transparent transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Shop" links={[["All Sarees","/shop"],["New Arrivals","/shop"],["Best Sellers","/shop"],["Wedding Edit","/categories"]]} />
        <FooterCol title="Help" links={[["Contact","/contact"],["Track Order","/track"],["Shipping","/about"],["Returns","/about"]]} />
        <div>
          <h4 className="font-serif text-lg mb-4">Newsletter</h4>
          <p className="text-sm text-cream/80 mb-3">Get 10% off your first order.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-sm placeholder:text-cream/50 focus:outline-none focus:border-gold" />
            <button className="px-4 py-2 rounded-md bg-gradient-gold text-maroon-deep text-sm font-semibold"><Mail className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Minni Saree's · Crafted with ♥ in India
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-serif text-lg mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-cream/80">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to} className="hover:text-gold transition-colors">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}