import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { products } from "@/data/products";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — Minni Saree's" },
      { name: "description", content: "Explore the Minni Saree's editorial lookbook featuring bridal, festive, and everyday saree styling." },
      { property: "og:title", content: "Lookbook — Minni Saree's" },
      { property: "og:description", content: "Explore the Minni Saree's editorial lookbook featuring bridal, festive, and everyday saree styling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LookbookPage,
});

const heroLooks = [
  { image: lookbook1, title: "Regal Weddings", subtitle: "Bridal heirlooms for your forever.", tag: "Bridal Edit" },
  { image: lookbook2, title: "Celebrations of Light", subtitle: "Festive silks for Diwali & beyond.", tag: "Festive Edit" },
];

export default function LookbookPage() {
  return (
    <SiteLayout>
      <div className="bg-secondary/30 py-12 border-b border-border text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-maroon">Editorial</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-3">The Minni Lookbook</h1>
        <div className="gold-divider w-24 mx-auto mt-4" />
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto px-4">Styled stories of heritage weaves, festive moments, and everyday elegance.</p>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {heroLooks.map((look, i) => (
            <motion.div
              key={look.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
            >
              <img
                src={look.image}
                alt={look.title}
                loading="lazy"
                width={1280}
                height={864}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-cream">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{look.tag}</p>
                <h2 className="font-serif text-3xl md:text-4xl mt-2">{look.title}</h2>
                <p className="mt-2 text-cream/80 max-w-sm">{look.subtitle}</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium border-b border-gold pb-1 hover:text-gold transition-colors"
                >
                  Shop the edit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-maroon">Shop the Looks</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">Curated Saree Gallery</h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
            >
              <Link to="/shop" className="group relative aspect-[3/4] block overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-5 left-5 right-5 text-cream translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs uppercase tracking-wider text-gold">{p.category}</p>
                  <h3 className="font-serif text-lg mt-1 leading-tight">{p.name}</h3>
                  <p className="text-sm mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
