import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { motion } from "framer-motion";

const categories = [
    { href: "/jeans", name: "Tailored Denim", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "Premium Basics", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Footwear", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Eyewear", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Outerwear", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "The Suit", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Leather Goods", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className='relative min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] text-stone-900 dark:text-stone-100 transition-colors duration-700'>
            <div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32'>
                
                {/* Hero Section: The Statement */}
                <motion.header 
                    className="flex flex-col items-center text-center mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.span 
                        className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] font-bold mb-6"
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.6em" }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                    >
                        Autumn / Winter 2026
                    </motion.span>
                    
                    <h1 className='text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tight text-stone-900 dark:text-stone-50'>
                        The Art of <br /> <span className="italic font-light">Essentialism</span>
                    </h1>
                    
                    <p className='text-sm md:text-lg text-stone-500 dark:text-stone-400 font-light max-w-xl leading-relaxed tracking-wide mx-auto'>
                        A meticulous curation where timeless silhouettes meet 
                        unrivaled craftsmanship. Defining the modern wardrobe through 
                        sophistication in every stitch.
                    </p>
                    
                    <motion.div 
                        className="h-20 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent mt-16"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </motion.header>

                {/* Featured Products: The VIP Showcase */}
                {!isLoading && products.length > 0 && (
                    <motion.section 
                        className="mb-40"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col items-center mb-16">
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-2">Exclusively Curated</h2>
                            <h3 className="text-3xl font-serif italic">Featured Masterpieces</h3>
                        </div>
                        <FeaturedProducts featuredProducts={products} />
                    </motion.section>
                )}

                {/* Categories: The Departments */}
                <section className="relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-stone-200 dark:border-stone-900 pb-8 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 dark:text-stone-200">Shop by Collection</h2>
                            <p className="text-stone-400 dark:text-stone-600 text-xs mt-2 uppercase tracking-widest font-medium">Explore our specialized departments</p>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold border border-[#D4AF37]/30 px-4 py-2 rounded-full">
                            {categories.length} Exclusive Tiers
                        </span>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <CategoryItem category={category} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Brand Note */}
                <motion.div 
                    className="mt-40 text-center border-t border-stone-100 dark:border-stone-900 pt-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="font-serif italic text-2xl text-stone-300 dark:text-stone-800">
                        Crafted for the discerning individual.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;