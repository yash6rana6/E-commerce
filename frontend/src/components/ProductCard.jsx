import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { 
                id: "login",
                style: {
                    borderRadius: '2px',
                    background: '#1c1917',
                    color: '#fff',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    padding: '16px'
                }
            });
            return;
        }
        addToCart(product);
    };

    return (
        <div className='group relative flex w-full flex-col bg-white dark:bg-[#141413] border border-stone-100 dark:border-stone-900 transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'>
            
            {/* Image Container */}
            <div className='relative aspect-[4/5] overflow-hidden bg-stone-50 dark:bg-stone-900'>
                <img 
                    className='object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110' 
                    src={product.image} 
                    alt={product.name} 
                />
                
                {/* Subtle Hover Overlay */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700' />
                
                {/* Quick Add Button: Bottom Slide-up */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                    <button
                        className='w-full bg-white/90 dark:bg-stone-100 backdrop-blur-md text-stone-900 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-white transition-all duration-500 shadow-2xl'
                        onClick={handleAddToCart}
                    >
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className='pt-8 pb-8 px-6 flex flex-col items-center text-center'>
                <h3 className='text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400 dark:text-stone-500 mb-3'>
                    {product.category || "Collection"}
                </h3>
                
                <h5 className='text-xl font-serif text-stone-900 dark:text-stone-100 mb-4 group-hover:text-[#D4AF37] transition-colors duration-500 italic'>
                    {product.name}
                </h5>
                
                <div className='flex flex-col items-center gap-6'>
                    <span className='text-2xl font-light text-stone-900 dark:text-stone-100 font-serif'>
                        ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    
                    {/* Main Action Link: Minimalist Underline Style */}
                    <button
                        className='flex items-center justify-center gap-2 border-b-[1px] border-stone-300 dark:border-stone-800 pb-1 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-900 dark:text-stone-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500'
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={13} strokeWidth={2.5} />
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;