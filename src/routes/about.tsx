import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-saree.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Minni Saree's" }, { name: "description", content: "Our story: heritage handloom sarees crafted by Indian artisans." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon">Our Story</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">Weaving Heritage into <span className="text-gradient-gold italic">Every Drape.</span></h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Born from a love for India's textile heritage, Minni Saree's curates handwoven sarees from master artisans across Varanasi, Kanchipuram, and Bengal. Every saree carries a story — of looms, families, and centuries-old craft.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe in fair wages for our weavers, sustainable fabrics, and timeless design that travels through generations.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[["50K+", "Happy Customers"], ["200+", "Artisan Families"], ["15+", "Years of Craft"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl text-maroon">{n}</p>
                <p className="text-xs text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-elegant">
          <img src={hero} alt="Heritage saree" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Our Promise</h2>
          <div className="gold-divider w-24 mx-auto my-5" />
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              ["Authentic Handloom", "Every piece is loom-certified and traceable to its weaver."],
              ["Fair Trade", "We pay our artisans premium wages — always."],
              ["Conscious Luxury", "Natural dyes, recyclable packaging, zero shortcuts."],
            ].map(([t, d]) => (
              <div key={t} className="bg-card rounded-2xl p-7 border border-border">
                <h3 className="font-serif text-xl text-maroon">{t}</h3>
                <p className="text-sm text-muted-foreground mt-3">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}