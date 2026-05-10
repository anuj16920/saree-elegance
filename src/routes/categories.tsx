import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Minni Saree's" }, { name: "description", content: "Explore saree categories: Banarasi, Kanchipuram, silk, cotton, designer & wedding." }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SiteLayout>
      <div className="bg-secondary/30 py-12 border-b border-border text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-maroon">Curated Edits</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-3">Saree Categories</h1>
        <div className="gold-divider w-24 mx-auto mt-4" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/shop" className="relative block aspect-[4/5] rounded-2xl overflow-hidden group">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-cream">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{count} styles</p>
                  <h3 className="font-serif text-3xl mt-2">{c.name}</h3>
                  <span className="inline-block mt-3 text-sm border-b border-gold pb-1">Shop now →</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SiteLayout>
  );
}