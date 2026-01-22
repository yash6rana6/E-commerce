import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

    useEffect(() => {
        getMyCoupon();
    }, [getMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);

    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        applyCoupon(userInputCode);
    };

    const handleRemoveCoupon = async () => {
        await removeCoupon();
        setUserInputCode("");
    };

    return (
        <motion.div
            // Container: Dark mode mein matte background aur stone border
            className='space-y-6 rounded-sm border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141413] p-6 shadow-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className='space-y-4'>
                <div>
                    <label htmlFor='voucher' className='mb-3 block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 dark:text-stone-400'>
                        Voucher & Gift Cards
                    </label>
                    <div className="relative">
                        <input
                            type='text'
                            id='voucher'
                            className='block w-full rounded-sm border border-stone-200 dark:border-stone-800 bg-stone-50 
                            dark:bg-[#1A1A19] p-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 
                            focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none'
                            placeholder='Enter your code'
                            value={userInputCode}
                            onChange={(e) => setUserInputCode(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <motion.button
                    type='button'
                    className='flex w-full items-center justify-center rounded-sm bg-stone-900 dark:bg-stone-100 px-5 py-3 
                    text-[10px] font-bold uppercase tracking-[0.2em] text-white dark:text-stone-900 hover:bg-[#D4AF37] 
                    dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all duration-500 shadow-lg'
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyCoupon}
                >
                    Apply Reward
                </motion.button>
            </div>

            {/* Applied Coupon State */}
            {isCouponApplied && coupon && (
                <div className='mt-4 pt-4 border-t border-stone-100 dark:border-stone-800'>
                    <h3 className='text-[10px] uppercase tracking-widest font-bold text-stone-900 dark:text-stone-100 mb-3'>Applied Benefit</h3>
                    <div className="flex justify-between items-center bg-stone-50 dark:bg-stone-900/50 p-4 border border-stone-100 dark:border-stone-800 rounded-sm">
                        <p className='text-sm text-stone-600 dark:text-stone-300 font-serif italic'>
                            {coupon.code} <span className="text-[#D4AF37] ml-2">— {coupon.discountPercentage}% off</span>
                        </p>
                        <button
                            type='button'
                            className='text-[9px] uppercase tracking-tighter font-bold text-stone-400 hover:text-red-600 transition-colors'
                            onClick={handleRemoveCoupon}
                        >
                            [ Remove ]
                        </button>
                    </div>
                </div>
            )}

            {/* Available Coupon Hint */}
            {!isCouponApplied && coupon && (
                <div className='mt-4 p-4 bg-[#FDFCF0]/50 dark:bg-stone-900/30 border border-dashed border-stone-200 dark:border-stone-800'>
                    <h3 className='text-[9px] uppercase tracking-widest font-bold text-stone-400 mb-1'>Exclusive Invitation:</h3>
                    <p className='text-sm text-stone-800 dark:text-stone-300 font-serif'>
                        Use code <span className="font-bold text-[#D4AF37]">{coupon.code}</span> for {coupon.discountPercentage}% off.
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default GiftCouponCard;