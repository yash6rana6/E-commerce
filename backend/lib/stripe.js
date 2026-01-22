import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: "../backend/.env" });

let stripe = null;
let stripeError = null;

try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY missing");
  }

  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  console.log("✅ Stripe initialized");
} catch (err) {
  stripeError = err;
  console.error("❌ Stripe initialization failed:", err.message);
}

export { stripe, stripeError };
