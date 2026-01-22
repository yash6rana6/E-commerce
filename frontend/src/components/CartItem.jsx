import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    return (
        // Container: Dark mode mein bg-[#141413] (Matte Black) ho jayega
        <div className='rounded-sm border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141413] p-4 shadow-sm md:p-6 mb-4 transition-all hover:shadow-md group'>
            <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
                
                {/* Product Image: Dark mode mein subtle border taaki image merged na lage */}
                <div className='shrink-0 md:order-1'>
                    <img 
                        className='h-24 w-24 md:h-32 md:w-32 rounded-sm object-cover border border-stone-100 dark:border-stone-800' 
                        src={item.image} 
                        alt={item.name}
                    />
                </div>

                <label className='sr-only'>Choose quantity:</label>

                {/* Quantity and Price Section */}
                <div className='flex items-center justify-between md:order-3 md:justify-end gap-8'>
                    <div className='flex items-center gap-3 bg-stone-50 dark:bg-stone-900/50 p-1 rounded-sm border border-stone-100 dark:border-stone-800'>
                        <button
                            className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border
                             border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-900 dark:hover:bg-[#D4AF37] hover:text-white 
                             transition-colors focus:outline-none'
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                            <Minus size={14} />
                        </button>
                        
                        <p className="w-4 text-center font-medium text-stone-800 dark:text-stone-200">{item.quantity}</p>
                        
                        <button
                            className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border
                             border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-900 dark:hover:bg-[#D4AF37] hover:text-white 
                             transition-colors focus:outline-none'
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <div className='text-end md:order-4 md:w-32'>
                        {/* Price: Signature Gold Accent */}
                        <p className='text-lg font-serif font-semibold text-[#D4AF37]'>
                            ${(item.price * item.quantity).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Product Details */}
                <div className='w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md'>
                    <p className='text-lg font-serif font-medium text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] transition-colors cursor-pointer'>
                        {item.name}
                    </p>
                    <p className='text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2'>
                        {item.description}
                    </p>

                    <div className='flex items-center gap-4 pt-2'>
                        <button
                            className='inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest
                             text-stone-400 dark:text-stone-500 hover:text-red-700 dark:hover:text-red-500 transition-colors'
                            onClick={() => removeFromCart(item._id)}
                        >
                            <Trash size={14} />
                            <span>Remove Item</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;