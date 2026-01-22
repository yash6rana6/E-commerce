import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

// Public key should be in .env in production, but keeping it for your logic
const stripePromise = loadStripe(
    "pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const OrderSummary = () => {
    const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 });
    const formattedTotal = total.toLocaleString(undefined, { minimumFractionDigits: 2 });
    const formattedSavings = savings.toLocaleString(undefined, { minimumFractionDigits: 2 });

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await axios.post("/api/payment/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon.code : null,
            });

            if (res.status === 200) {
                const session = res.data;
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result.error) {
                    console.error("Stripe Checkout Error:", result.error.message);
                }
            }
        } catch (error) {
            console.error("Payment Error:", error);
        }
    };

    return (
        <motion.div
            // Container: Matte Deep Black with sharp gold-tinted borders in Dark Mode
            className='space-y-6 rounded-sm bg-[#0F0F0E] p-8 shadow-2xl text-white border border-stone-800 dark:border-[#D4AF37]/10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <p className='text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] border-b border-stone-800 pb-5'>
                Order Summary
            </p>

            <div className='space-y-5'>
                <div className='space-y-4'>
                    <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-xs font-medium text-stone-500 uppercase tracking-widest'>Subtotal</dt>
                        <dd className='text-sm font-semibold text-stone-200'>${formattedSubtotal}</dd>
                    </dl>

                    {savings > 0 && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='text-xs font-medium text-stone-500 uppercase tracking-widest'>Savings</dt>
                            <dd className='text-sm font-semibold text-[#D4AF37]'>-${formattedSavings}</dd>
                        </dl>
                    )}

                    {coupon && isCouponApplied && (
                        <dl className='flex items-center justify-between gap-4 bg-stone-900/50 p-3 rounded-sm border border-dashed border-stone-800'>
                            <dt className='text-[10px] font-bold text-stone-400 uppercase tracking-widest italic'>Benefit ({coupon.code})</dt>
                            <dd className='text-sm font-bold text-[#D4AF37]'>-{coupon.discountPercentage}%</dd>
                        </dl>
                    )}

                    <dl className='flex items-center justify-between gap-4 border-t border-stone-800 pt-6 mt-4'>
                        <dt className='text-xl font-serif tracking-widest text-white italic'>Total</dt>
                        <dd className='text-2xl font-serif font-bold text-white shadow-gold'>${formattedTotal}</dd>
                    </dl>
                </div>

                {/* Main Action: High-Contrast Gold Button */}
                <motion.button
                    className='flex w-full items-center justify-center rounded-sm bg-[#D4AF37] px-5 py-4 
                    text-[10px] font-bold uppercase tracking-[0.3em] text-stone-950 hover:bg-white 
                    transition-all duration-500 focus:outline-none shadow-[0_10px_20px_rgba(212,175,55,0.15)]'
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                >
                    Proceed to Payment
                </motion.button>

                <div className='flex items-center justify-center gap-2 pt-4'>
                    <Link
                        to='/'
                        className='inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-[#D4AF37] transition-all duration-300 group'
                    >
                        <MoveRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
            
            <div className="pt-4 text-center border-t border-stone-900">
                <p className="text-[9px] text-stone-600 uppercase tracking-[0.1em] font-medium">
                    Fully Encrypted & Secure <br/> 
                    <span className="opacity-50">Powered by Stripe International</span>
                </p>
            </div>
        </motion.div>
    );
};

export default OrderSummary;