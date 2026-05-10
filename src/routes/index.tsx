import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Truck, ShieldCheck, RefreshCcw, Star, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/data/products";
import hero from "@/assets/hero-saree.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.bestSeller || p.trending).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const wedding = products.filter((p) => p.category === "Wedding" || p.occasion === "Bridal");
  const silk = products.filter((p) => p.category === "Silk" || p.fabric.includes("Silk")).slice(0, 4);
  const cotton = products.filter((p) => p.category === "Cotton");
  const banarasi = products.filter((p) => p.category === "Banarasi");
  const kanchi = products.filter((p) => p.category === "Kanchipuram");

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 items-center gap-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-maroon">
              <span className="w-8 h-px bg-gold" /> Festive Collection 2025
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mt-4">
              Drape the <span className="text-gradient-gold italic">Heritage</span><br />
              of India.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg">
              Handwoven Banarasi, Kanchipuram & designer sarees crafted by master artisans for the modern Indian woman.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-royal text-primary-foreground font-medium shadow-elegant hover:scale-105 transition-transform">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/categories" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-maroon text-maroon font-medium hover:bg-maroon hover:text-cream transition-colors">
                Explore Categories
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => <div key={i} className="w-8 h-8 rounded-full bg-gradient-gold border-2 border-background" />)}
              </div>
              <div><div className="flex text-gold">{"★★★★★"}</div>50,000+ happy customers</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative">
            <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-elegant">
              <img src={hero} alt="Indian model in red Banarasi saree" width={1536} height={1280} className="w-full h-full object-cover" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Featured</p>
                  <p className="font-serif text-lg">Rani Banarasi Silk</p>
                </div>
                <span className="font-serif text-xl text-maroon">₹8,499</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [Award, "Authentic", "Handloom certified"],
            [Truck, "Free Shipping", "Above ₹2999"],
            [ShieldCheck, "Secure Payments", "UPI · COD · Cards"],
            [RefreshCcw, "Easy Returns", "7-day hassle free"],
          ].map(([Icon, t, d], i) => (
            <div key={i} className="flex items-center gap-3">
              {/* @ts-expect-error icon component */}
              <Icon className="w-6 h-6 text-maroon" />
              <div><p className="text-sm font-semibold">{t as string}</p><p className="text-xs text-muted-foreground">{d as string}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FESTIVE BANNER */}
      <Section>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-festive p-10 md:p-16 text-primary-foreground">
          <div className="absolute inset-0 opacity-20 shimmer" />
          <div className="relative max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cream/80">Diwali Edit</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">Festive Collection — Up to 40% Off</h2>
            <p className="mt-4 text-cream/90">Celebrate the season of light in handcrafted silks and luminous embroidery.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-cream text-maroon font-semibold">
              Shop the Edit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* CATEGORIES */}
      <Section>
        <Heading kicker="Shop by Category" title="Curated Collections" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/shop" search={{ category: c.slug }} className="block group">
                <div className="aspect-square rounded-full overflow-hidden border-2 border-gold p-1">
                  <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-center mt-3 text-sm font-medium group-hover:text-maroon">{c.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <ProductRail title="Featured Sarees" kicker="Editor's Picks" items={featured} />
      <ProductRail title="New Arrivals" kicker="Fresh off the loom" items={newArrivals} />

      {/* WEDDING BANNER SPLIT */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <BannerCard image={wedding[0]?.image} kicker="Wedding Collection" title="The Bridal Edit" subtitle="Ceremonial sarees, masterfully crafted." to="/categories" />
          <BannerCard image={banarasi[0]?.image} kicker="Heritage Weaves" title="Banarasi Legacy" subtitle="Pure silk woven in Varanasi." to="/shop" />
        </div>
      </Section>

      <ProductRail title="Best Sellers" kicker="Loved by Many" items={products.filter(p=>p.bestSeller)} />
      <ProductRail title="Silk Sarees" kicker="Pure & Lustrous" items={silk} />
      <ProductRail title="Banarasi Sarees" kicker="From Varanasi" items={banarasi} />
      <ProductRail title="Kanchipuram Sarees" kicker="South Indian Heritage" items={kanchi} />
      <ProductRail title="Cotton Sarees" kicker="Everyday Elegance" items={cotton} />

      {/* REVIEWS */}
      <Section>
        <Heading kicker="Loved by Women Across India" title="What Our Customers Say" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Aanya Sharma", city: "Mumbai", text: "The Banarasi I bought for my wedding was absolutely breathtaking. Felt like royalty!" },
            { name: "Lakshmi Iyer", city: "Chennai", text: "Authentic Kanchipuram, perfect packaging, and lightning fast delivery. Highly recommend." },
            { name: "Priya Reddy", city: "Hyderabad", text: "Quality is unmatched at this price. Already ordered three more for the festive season." },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <Quote className="w-6 h-6 text-gold mb-3" />
              <div className="flex text-gold mb-3">{Array.from({length:5}).map((_,k)=><Star key={k} className="w-4 h-4 fill-current" />)}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-serif text-base">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* INSTAGRAM */}
      <Section>
        <Heading kicker="@minnisarees" title="From Our Instagram" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {products.concat(products).slice(0, 6).map((p, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-lg">
              <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/40 transition-colors" />
            </a>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section>
        <div className="rounded-3xl bg-gradient-royal text-primary-foreground p-10 md:p-14 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Join the Minni Family</h2>
          <p className="mt-3 text-cream/90 max-w-lg mx-auto">Get 10% off your first order, plus early access to drops & festive offers.</p>
          <form className="mt-7 flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-full bg-cream/10 border border-cream/30 placeholder:text-cream/60 focus:outline-none focus:border-gold text-sm" />
            <button className="px-6 py-3 rounded-full bg-gradient-gold text-maroon-deep font-semibold text-sm">Subscribe</button>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">{children}</section>;
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-maroon">{kicker}</p>
      <h2 className="font-serif text-3xl md:text-4xl mt-2">{title}</h2>
      <div className="gold-divider w-24 mx-auto mt-4" />
    </div>
  );
}

function ProductRail({ title, kicker, items }: { title: string; kicker: string; items: typeof products }) {
  if (!items.length) return null;
  return (
    <Section>
      <Heading kicker={kicker} title={title} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </Section>
  );
}

function BannerCard({ image, kicker, title, subtitle, to }: { image?: string; kicker: string; title: string; subtitle: string; to: string }) {
  return (
    <Link to={to} className="relative overflow-hidden rounded-3xl aspect-[5/3] group block">
      {image && <img src={image} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/40 to-transparent" />
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-cream">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{kicker}</p>
        <h3 className="font-serif text-3xl md:text-4xl mt-2">{title}</h3>
        <p className="text-sm text-cream/80 mt-1">{subtitle}</p>
        <span className="inline-flex items-center gap-2 mt-4 text-sm font-medium">Discover <ArrowRight className="w-4 h-4" /></span>
      </div>
    </Link>
  );
}
}
