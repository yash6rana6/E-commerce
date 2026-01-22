import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const { fetchProductsByCategory, products } = useProductStore();
    const { category } = useParams();

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category]);

    const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] transition-colors duration-700'>
            <div className='relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 py-24'>
                
                {/* Editorial Header Section */}
                <header className="flex flex-col items-center mb-20 space-y-6">
                    {/* Refined Breadcrumbs */}
                    <nav className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] text-stone-400 dark:text-stone-600 font-bold">
                        <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Home</Link>
                        <span className="text-stone-300 dark:text-stone-800">/</span>
                        <span className="text-[#D4AF37]">{displayCategory}</span>
                    </nav>

                    <div className="text-center space-y-2">
                        <motion.h1
                            className='text-5xl sm:text-7xl font-serif text-stone-900 dark:text-stone-100 italic tracking-tight'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            {displayCategory}
                        </motion.h1>
                        <motion.div 
                            className="h-[1px] w-20 bg-[#D4AF37] mx-auto"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </div>
                    
                    <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-light tracking-[0.05em] max-w-lg text-center leading-relaxed">
                        A curated selection of the finest {category.toLowerCase()}, <br className="hidden sm:block" />
                        crafted with precision for those who appreciate timeless elegance.
                    </p>
                </header>

                {/* Product Grid */}
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    {products?.length === 0 ? (
                        <div className="col-span-full py-32 flex flex-col items-center space-y-8 border border-dashed border-stone-200 dark:border-stone-900 rounded-sm w-full">
                            <h2 className='text-2xl font-serif text-stone-400 dark:text-stone-700 italic text-center'>
                                This collection is currently being curated <br/> for the new season.
                            </h2>
                            <Link 
                                to="/" 
                                className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                            >
                                Return to Gallery
                            </Link>
                        </div>
                    ) : (
                        products?.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;