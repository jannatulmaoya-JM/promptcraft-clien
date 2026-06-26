"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "@/components/Navbar";
import { useSession } from "@/lib/auth";
import { paymentAPI } from "@/lib/proxy";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

const cardStyle = {
  style: {
    base: { color: "#f9fafb", fontSize: "15px", "::placeholder": { color: "#6b7280" }, iconColor: "#a78bfa" },
    invalid: { color: "#ef4444" },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    paymentAPI.createIntent()
      .then(r => setClientSecret(r.data.clientSecret))
      .catch(() => toast.error("Failed to initialize payment"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: session?.user?.email, name: session?.user?.name },
        },
      });
      if (error) throw new Error(error.message);
      if (paymentIntent.status === "succeeded") {
        await paymentAPI.confirm({ paymentIntentId: paymentIntent.id, amount: 5 });
        toast.success("Payment successful! Premium unlocked! 🎉");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 10, padding: "16px 14px", marginBottom: 20 }}>
        <CardElement options={cardStyle} />
      </div>
      <button type="submit" className="btn-primary" disabled={!stripe || loading || !clientSecret}
        style={{ width: "100%", padding: 16, fontSize: 16, opacity: loading ? 0.7 : 1 }}>
        {loading ? "Processing..." : "Pay $5.00 →"}
      </button>
      <p style={{ color: "#6b7280", fontSize: 12, textAlign: "center", marginTop: 12 }}>
        🔒 Secured by Stripe. Your card details are encrypted.
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.user) router.push("/login");
  }, [session]);

  const benefits = [
    "Access all premium & private prompts",
    "Unlimited prompt copies",
    "Priority customer support",
    "Early access to new prompts",
    "Premium creator badge",
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 900, width: "100%" }} className="payment-grid">
          {/* Plan details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.05))", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 20, padding: 36, height: "100%" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(124,58,237,0.2)", borderRadius: 99, marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>👑</span>
                <span style={{ color: "#a78bfa", fontSize: 13, fontWeight: 700 }}>PREMIUM PLAN</span>
              </div>
              <div style={{ fontSize: 52, fontWeight: 900, color: "#f9fafb", lineHeight: 1, marginBottom: 4 }}>$5</div>
              <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 32 }}>One-time payment · Lifetime access</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {benefits.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#a78bfa", flexShrink: 0 }}>✓</div>
                    <span style={{ color: "#d1d5db", fontSize: 14 }}>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, padding: 16, background: "rgba(6,182,212,0.05)", borderRadius: 10, border: "1px solid rgba(6,182,212,0.15)" }}>
                <p style={{ color: "#67e8f9", fontSize: 13, fontWeight: 600 }}>💡 Best Value</p>
                <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>Over 2,000 premium prompts available immediately after payment.</p>
              </div>
            </div>
          </motion.div>

          {/* Payment form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 20, padding: 36 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f9fafb", marginBottom: 6 }}>Complete Payment</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>Enter your card details to unlock premium access</p>

              {/* Order summary */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>
                  <span>PromptCraft Premium</span><span>$5.00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>
                  <span>Tax</span><span>$0.00</span>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "#f9fafb", fontWeight: 700, fontSize: 16 }}>
                  <span>Total</span><span>$5.00</span>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </motion.div>
        </div>
      </main>
      <style>{`@media (max-width: 768px) { .payment-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}