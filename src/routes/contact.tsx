import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Minni Saree's" }, { name: "description", content: "Reach Minni Saree's for orders, custom drapes & support." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-maroon">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-3">We'd Love to Hear from You</h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 mt-14">
          <div className="space-y-5">
            {[
              [Phone, "Call us", "+91 99999 99999"],
              [Mail, "Email us", "hello@minnisarees.com"],
              [MessageCircle, "WhatsApp", "+91 99999 99999"],
              [MapPin, "Visit", "Banjara Hills, Hyderabad, India"],
            ].map(([Icon, t, d]) => (
              <div key={t as string} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover-lift">
                {/* @ts-ignore */}
                <Icon className="w-6 h-6 text-maroon mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">{t as string}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{d as string}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-card border border-border rounded-2xl p-8 space-y-4">
            <Field label="Name" type="text" />
            <Field label="Email" type="email" />
            <Field label="Phone" type="tel" />
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea rows={5} className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-maroon" />
            </div>
            <button className="w-full px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">{sent ? "Thanks! We'll be in touch." : "Send Message"}</button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-maroon" />
    </div>
  );
}