import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
    { id: "create", label: "Inventory Entry", icon: PlusCircle },
    { id: "products", label: "The Collection", icon: ShoppingBasket },
    { id: "analytics", label: "Insights", icon: BarChart },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const { fetchAllProducts } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-700'>
            <div className='relative z-10 container mx-auto px-6 py-24'>
                
                {/* Header: Centered Elegance */}
                <motion.div
                    className="flex flex-col items-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className='text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37] mb-4'>
                        Management Suite
                    </h1>
                    <h2 className='text-4xl md:text-6xl font-serif text-stone-900 dark:text-stone-100 italic tracking-tight'>
                        Dashboard
                    </h2>
                    <div className="w-12 h-[1px] bg-stone-200 dark:bg-stone-800 mt-6"></div>
                </motion.div>

                {/* Navigation Tabs: Minimalist & Tactile */}
                <div className='flex justify-center border-b border-stone-200 dark:border-stone-900 mb-16'>
                    <div className="flex gap-4 sm:gap-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group flex items-center py-5 px-1 relative transition-all duration-500 ${
                                    activeTab === tab.id
                                        ? "text-stone-900 dark:text-stone-100"
                                        : "text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400"
                                }`}
                            >
                                <tab.icon className={`mr-2.5 h-4 w-4 transition-all duration-500 ${
                                    activeTab === tab.id ? "text-[#D4AF37] scale-110" : "text-stone-300 dark:text-stone-800 group-hover:text-stone-400"
                                }`} />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                    {tab.label}
                                </span>
                                
                                {/* Animated Gold Underline: Uses Framer Motion LayoutId for sliding effect */}
                                {activeTab === tab.id && (
                                    <motion.div 
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_-4px_10px_rgba(212,175,55,0.2)]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area with smooth cross-fade */}
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {activeTab === "create" && <CreateProductForm />}
                            {activeTab === "products" && <ProductsList />}
                            {activeTab === "analytics" && <AnalyticsTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;