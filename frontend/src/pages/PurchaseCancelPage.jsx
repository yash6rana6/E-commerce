import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] flex items-center justify-center px-6 transition-colors duration-700'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='max-w-md w-full bg-white dark:bg-[#0F0F0E] border border-stone-200 dark:border-stone-900 shadow-[0_30px_60px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden relative z-10 rounded-sm'
            >
                {/* Visual Accent: Gold Top Bar */}
                <div className="h-1 w-full bg-[#D4AF37]/30" />

                <div className='p-10 sm:p-14'>
                    {/* Icon: De-emphasized & Minimalist */}
                    <div className='flex justify-center mb-10'>
                        <div className="relative group">
                            <XCircle className='text-stone-200 dark:text-stone-800 w-20 h-20' strokeWidth={0.5} />
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#D4AF37] origin-center"
                            />
                        </div>
                    </div>

                    {/* Content: High-Fashion Copywriting */}
                    <div className="space-y-4 text-center mb-10">
                        <h1 className='text-3xl font-serif text-stone-900 dark:text-stone-100 italic tracking-tight'>
                            Selection Paused
                        </h1>
                        <p className='text-stone-500 dark:text-stone-400 text-xs font-light leading-relaxed max-w-[240px] mx-auto uppercase tracking-wide'>
                            Your checkout has been suspended. No charges were made, and your pieces remain reserved in your bag.
                        </p>
                    </div>

                    {/* Assistance Block: Soft Background */}
                    <div className='bg-stone-50 dark:bg-stone-900/30 border-y border-stone-100 dark:border-stone-800 py-8 mb-10 -mx-10 sm:-mx-14 px-10 sm:px-14'>
                        <p className='text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] text-center font-bold mb-3'>
                            Concierge Services
                        </p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 text-center italic leading-relaxed">
                            Should you require assistance with your acquisition, <br /> 
                            our advisors are ready to help.
                        </p>
                    </div>

                    {/* Action Buttons: Clear Hierarchy */}
                    <div className='space-y-6'>
                        <Link
                            to={"/cart"}
                            className='group relative w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] py-5 transition-all duration-500 flex items-center justify-center overflow-hidden'
                        >
                            <span className="relative z-10 flex items-center">
                                <ArrowLeft className='mr-3 group-hover:-translate-x-2 transition-transform duration-500' size={14} />
                                Return to Bag
                            </span>
                            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                        
                        <Link
                            to={"/"}
                            className='w-full text-stone-400 dark:text-stone-600 hover:text-stone-900 dark:hover:text-stone-300 text-[9px] uppercase tracking-[0.4em] font-bold py-2 text-center block transition-all'
                        >
                            Continue Exploring
                        </Link>
                    </div>
                </div>
            </motion.div>
            
            {/* Background Decorative Element */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-stone-200/20 dark:text-stone-900/20 pointer-events-none -z-0 select-none">
                Ethereal
            </div>
        </div>
    );
};

export default PurchaseCancelPage;