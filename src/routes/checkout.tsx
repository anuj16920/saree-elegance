import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useShop } from "@/context/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Minni Saree's" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartProducts, cartTotal, clearCart } = useShop();
  const [step, setStep] = useState<"address" | "payment" | "done">("address");
  const [pay, setPay] = useState("upi");
  const shipping = cartTotal > 2999 ? 0 : 99;
  const total = cartTotal + shipping;

  if (cartProducts.length === 0 && step !== "done") {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="inline-block mt-5 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Shop Sarees</Link>
        </div>
      </SiteLayout>
    );
  }

  if (step === "done") {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-gold grid place-items-center mx-auto"><Check className="w-10 h-10 text-maroon-deep" /></div>
          <h1 className="font-serif text-3xl md:text-4xl mt-6">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mt-3">Your order #MN{Math.floor(Math.random() * 90000 + 10000)} has been confirmed.</p>
          <p className="text-sm text-muted-foreground mt-1">A confirmation email is on its way.</p>
          <div className="flex gap-3 justify-center mt-8">
            <Link to="/track" className="px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Track Order</Link>
            <Link to="/shop" className="px-6 py-3 rounded-full border border-border">Continue Shopping</Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl mb-2">Checkout</h1>
        <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-700" /> 100% secure checkout</p>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            <Card title="1. Shipping Address" active={step === "address"}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" />
                <Input label="Phone" />
                <Input label="Email" className="sm:col-span-2" />
                <Input label="Address Line" className="sm:col-span-2" />
                <Input label="City" />
                <Input label="Pincode" />
              </div>
              {step === "address" && (
                <button onClick={() => setStep("payment")} className="mt-5 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-semibold">Continue to Payment</button>
              )}
            </Card>

            <Card title="2. Payment Method" active={step === "payment"}>
              {step === "payment" ? (
                <>
                  <div className="space-y-3">
                    {[
                      ["upi", "UPI", "GPay · PhonePe · Paytm"],
                      ["card", "Credit / Debit Card", "All major cards accepted"],
                      ["razorpay", "Razorpay", "All payment methods"],
                      ["cod", "Cash on Delivery", "Pay when you receive"],
                    ].map(([id, t, d]) => (
                      <label key={id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${pay === id ? "border-maroon bg-maroon/5" : "border-border"}`}>
                        <input type="radio" name="pay" value={id} checked={pay === id} onChange={() => setPay(id)} className="mt-1 accent-maroon" />
                        <div><p className="font-semibold text-sm">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => { clearCart(); setStep("done"); }} className="mt-5 w-full px-6 py-3.5 rounded-full bg-gradient-royal text-primary-foreground font-semibold">
                    Place Order · ₹{total.toLocaleString("en-IN")}
                  </button>
                </>
              ) : <p className="text-sm text-muted-foreground">Complete shipping address first.</p>}
            </Card>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
            <h3 className="font-serif text-xl mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-72 overflow-auto">
              {cartProducts.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 text-sm">
                  <img src={product.image} alt="" className="w-14 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="line-clamp-1 font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {qty}</p>
                  </div>
                  <p className="font-semibold">₹{(product.price * qty).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <Row label="Subtotal" value={`₹${cartTotal.toLocaleString("en-IN")}`} />
            <Row label="Shipping" value={shipping === 0 ? "FREE" : `₹${shipping}`} />
            <div className="border-t border-border my-3" />
            <Row label="Total" value={`₹${total.toLocaleString("en-IN")}`} bold />
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Card({ title, active, children }: { title: string; active: boolean; children: React.ReactNode }) {
  return (
    <div className={`bg-card border rounded-2xl p-6 ${active ? "border-maroon shadow-soft" : "border-border opacity-80"}`}>
      <h2 className="font-serif text-xl mb-4">{title}</h2>
      {children}
    </div>
  );
}
function Input({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-maroon text-sm" />
    </div>
  );
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-1 text-sm ${bold ? "font-serif text-lg" : ""}`}>
      <span className={bold ? "text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}