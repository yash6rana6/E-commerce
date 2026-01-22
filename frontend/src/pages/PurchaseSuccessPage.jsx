import { ArrowRight, CheckCircle, HandHeart, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axios.post("/payments/checkout-success", { sessionId });
                clearCart();
            } catch (error) {
                console.error(error);
                setError("Refining your order details...");
            } finally {
                setIsProcessing(false);
            }
        };

        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("Session details could not be retrieved.");
        }
    }, [clearCart]);

    if (isProcessing) return (
        <div className="h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] flex flex-col items-center justify-center space-y-6">
            <Loader className="animate-spin text-[#D4AF37]" size={40} strokeWidth={1} />
            <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 animate-pulse">Authenticating Acquisition</p>
        </div>
    );

    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] flex items-center justify-center px-6 py-24 transition-colors duration-700'>
            {/* Minimalist Confetti: Signature Colors */}
            {!error && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    gravity={0.03}
                    colors={["#D4AF37", "#1C1917", "#F9F8F3"]}
                    numberOfPieces={120}
                    recycle={false}
                />
            )}

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className='max-w-xl w-full bg-white dark:bg-[#0F0F0E] border border-stone-100 dark:border-stone-900 shadow-[0_40px_80px_rgba(0,0,0,0.06)] dark:shadow-none relative z-10 rounded-sm overflow-hidden'
            >
                {/* Decorative Top Border */}
                <div className="h-1.5 w-full bg-gradient-to-r from-stone-900 via-[#D4AF37] to-stone-900" />

                <div className='p-10 sm:p-20 flex flex-col items-center text-center'>
                    <motion.div 
                        className='mb-10 relative'
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                    >
                        <CheckCircle className='text-[#D4AF37] w-20 h-20 relative z-10' strokeWidth={0.5} />
                        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full" />
                    </motion.div>

                    <h1 className='text-4xl sm:text-5xl font-serif text-stone-900 dark:text-stone-100 mb-6 italic tracking-tight'>
                        {error ? "Registry Updated" : "A New Acquisition"}
                    </h1>

                    <p className='text-stone-500 dark:text-stone-400 font-light text-sm leading-relaxed mb-12 max-w-sm mx-auto'>
                        {error 
                          ? "Your order has been recorded in our archives. Our advisors are currently finalizing the verification."
                          : "We express our gratitude for your patronage. Your selection is being prepared with the utmost precision."}
                    </p>

                    {/* Digital Receipt Card */}
                    <div className='w-full bg-stone-50 dark:bg-stone-900/40 border-y border-stone-100 dark:border-stone-800 py-10 px-6 mb-12 space-y-5'>
                        <div className='flex items-center justify-between border-b border-stone-200/50 dark:border-stone-800 pb-4'>
                            <span className='text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold'>Reference</span>
                            <span className='text-xs font-serif text-stone-900 dark:text-stone-100 tracking-widest uppercase'>#STUDIO-{(Math.random() * 10000).toFixed(0)}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold'>Status</span>
                            <span className='text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest'>Preparing for Dispatch</span>
                        </div>
                    </div>

                    <div className='w-full space-y-6'>
                        <button className='group relative w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] py-5 transition-all overflow-hidden'>
                            <span className="relative z-10 flex items-center justify-center">
                                <HandHeart className='mr-3 text-[#D4AF37]' size={16} />
                                View Collection Registry
                            </span>
                            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                        
                        <Link
                            to={"/"}
                            className='w-full flex items-center justify-center group text-stone-400 dark:text-stone-600 hover:text-stone-900 dark:hover:text-stone-200 transition-colors py-2'
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Return to Gallery</span>
                            <ArrowRight className='ml-3 group-hover:translate-x-2 transition-transform duration-500' size={14} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseSuccessPage;