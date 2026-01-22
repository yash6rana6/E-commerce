import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

    return (
        <motion.div
            // Container: Dark mode mein Deep Charcoal aur subtle gold glow
            className='bg-white dark:bg-[#0F0F0E] border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden max-w-5xl mx-auto rounded-sm transition-colors duration-500'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="overflow-x-auto">
                <table className='min-w-full divide-y divide-stone-100 dark:divide-stone-800'>
                    {/* Header: Editorial Slate look */}
                    <thead className='bg-stone-50 dark:bg-[#161615]'>
                        <tr>
                            <th scope='col' className='px-6 py-5 text-left text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]'>
                                Product Piece
                            </th>
                            <th scope='col' className='px-6 py-5 text-left text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]'>
                                Price
                            </th>
                            <th scope='col' className='px-6 py-5 text-left text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]'>
                                Category
                            </th>
                            <th scope='col' className='px-6 py-5 text-left text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]'>
                                Featured
                            </th>
                            <th scope='col' className='px-6 py-5 text-right text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]'>
                                Management
                            </th>
                        </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-[#0F0F0E] divide-y divide-stone-100 dark:divide-stone-800'>
                        {products?.map((product) => (
                            <tr key={product._id} className='hover:bg-stone-50/50 dark:hover:bg-stone-900/30 transition-all duration-300 group'>
                                {/* Product Info with Image */}
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-14 w-14 border border-stone-100 dark:border-stone-800 p-0.5 overflow-hidden'>
                                            <img
                                                className='h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-serif text-stone-900 dark:text-stone-100 group-hover:text-[#D4AF37] transition-colors'>
                                                {product.name}
                                            </div>
                                            <div className='text-[9px] text-stone-400 dark:text-stone-600 uppercase tracking-tighter mt-0.5'>
                                                REF: {product._id.slice(-8).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium text-stone-600 dark:text-stone-300 font-serif'>
                                        ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                </td>

                                {/* Category */}
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full'>
                                        {product.category}
                                    </span>
                                </td>

                                {/* Featured Star */}
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => toggleFeaturedProduct(product._id)}
                                        className={`p-2 rounded-full transition-all duration-500 ${
                                            product.isFeatured 
                                                ? "text-[#D4AF37] bg-[#D4AF37]/5 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                                                : "text-stone-300 dark:text-stone-700 hover:text-stone-400"
                                        }`}
                                    >
                                        <Star className='h-4 w-4' fill={product.isFeatured ? "currentColor" : "none"} />
                                    </button>
                                </td>

                                {/* Actions: Management */}
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className='text-stone-300 dark:text-stone-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 p-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                                    >
                                        <Trash className='h-4 w-4' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ProductsList;