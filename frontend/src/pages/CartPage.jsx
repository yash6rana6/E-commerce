import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
    const { cart } = useCartStore();

    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] py-16 md:py-28 transition-colors duration-700'>
            <div className='mx-auto max-w-screen-xl px-6 2xl:px-0'>
                
                {/* Page Header: Minimalist Editorial Look */}
                <header className="mb-16 border-b border-stone-200 dark:border-stone-900 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 italic">Your Selection</h1>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="h-[1px] w-10 bg-[#D4AF37]"></span>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 font-bold">
                                {cart.length} {cart.length === 1 ? 'Exquisite Piece' : 'Curated Pieces'}
                            </p>
                        </div>
                    </motion.div>
                </header>

                <div className='mt-8 md:gap-16 lg:flex lg:items-start'>
                    {/* Left Column: Cart Items List */}
                    <motion.div
                        className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {cart.length === 0 ? (
                                <EmptyCartUI key="empty" />
                            ) : (
                                <div key="items" className='space-y-10'>
                                    {cart.map((item) => (
                                        <CartItem key={item._id} item={item} />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                        
                        {cart.length > 0 && <PeopleAlsoBought />}
                    </motion.div>

                    {/* Right Column: Checkout Sidebar (Sticky) */}
                    {cart.length > 0 && (
                        <motion.aside
                            className='mx-auto mt-16 max-w-4xl flex-1 space-y-8 lg:mt-0 lg:w-full lg:sticky lg:top-32'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <OrderSummary />
                            <GiftCouponCard />
                            
                            {/* Trust Badge / Service Note */}
                            <div className="p-6 border border-stone-200 dark:border-stone-900 rounded-sm bg-white/50 dark:bg-[#0F0F0E]/50 backdrop-blur-sm">
                                <div className="space-y-4 text-center">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-500 leading-relaxed font-medium">
                                        Complimentary shipping on orders over $500. <br/>
                                        <span className="text-[#D4AF37]">Signature packaging included.</span>
                                    </p>
                                    <div className="h-[1px] w-8 bg-stone-200 dark:bg-stone-800 mx-auto"></div>
                                    <p className="text-[9px] text-stone-400 dark:text-stone-600 uppercase tracking-tighter">
                                        White Glove Delivery Available
                                    </p>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </div>
            </div>
        </div>
    );
};

const EmptyCartUI = () => (
    <motion.div
        className='flex flex-col items-center justify-center space-y-10 py-32 bg-white dark:bg-[#0F0F0E] border border-stone-100 dark:border-stone-900 rounded-sm shadow-xl shadow-stone-200/50 dark:shadow-none'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
    >
        <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-700" />
            <ShoppingCart className='h-20 w-20 text-stone-100 dark:text-stone-800 relative z-10' strokeWidth={0.5} />
            <motion.div 
                className="absolute -bottom-1 -right-1 h-5 w-5 bg-[#D4AF37] rounded-full z-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
            />
        </div>
        
        <div className="text-center space-y-4 px-6">
            <h3 className='text-3xl font-serif text-stone-900 dark:text-stone-100 italic tracking-tight'>Your bag is awaiting your first choice.</h3>
            <p className='text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-[0.15em] max-w-sm mx-auto leading-loose'>
                Experience the collection and discover <br/> pieces crafted for eternity.
            </p>
        </div>

        <Link
            className='group relative flex items-center justify-center bg-stone-900 dark:bg-stone-100 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white dark:text-stone-900 transition-all duration-500 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white shadow-2xl overflow-hidden'
            to='/'
        >
            <span className="relative z-10 flex items-center gap-3">
                Begin Exploring
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
        </Link>
    </motion.div>
);

export default CartPage;