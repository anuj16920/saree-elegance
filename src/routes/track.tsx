import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — Minni Saree's" }] }),
  component: TrackPage,
});

const steps = [
  { Icon: CheckCircle2, label: "Order Placed", date: "Mon, 5 May", done: true },
  { Icon: Package, label: "Packed", date: "Tue, 6 May", done: true },
  { Icon: Truck, label: "Shipped", date: "Wed, 7 May", done: true },
  { Icon: Clock, label: "Out for Delivery", date: "Fri, 9 May", done: false },
  { Icon: CheckCircle2, label: "Delivered", date: "Expected Sat, 10 May", done: false },
];

function TrackPage() {
  const [id, setId] = useState("MN12345");
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl mb-2">Track Your Order</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter your order ID to see live status.</p>
        <div className="flex gap-2 mb-10">
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="MN12345" className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:border-maroon text-sm" />
          <button className="px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold text-sm">Track</button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="font-serif text-xl">#{id}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-gradient-gold text-maroon-deep text-xs font-semibold">In Transit</span>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-3 bottom-3 w-px bg-border" />
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-4 relative pb-7">
                <div className={`w-10 h-10 rounded-full grid place-items-center relative z-10 ${s.done ? "bg-gradient-royal text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  <s.Icon className="w-5 h-5" />
                </div>
                <div className="pt-1.5">
                  <p className={`font-medium ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}