import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while fetching recommendations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    // Hide the section gracefully if no recommendations exist
    if (recommendations.length === 0) return null;

    return (
        <div className='mt-24 border-t border-stone-200 dark:border-stone-800 pt-16 transition-colors duration-500'>
            {/* Header: Editorial Style */}
            <div className="mb-12">
                <h3 className='text-3xl md:text-4xl font-serif text-stone-900 dark:text-stone-100 italic'>
                    Complete The Look
                </h3>
                <div className="flex items-center gap-3 mt-4">
                    <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 font-bold">
                        Curated Recommendations
                    </p>
                </div>
            </div>

            {/* Grid: Tighter gap for a "Gallery" feel */}
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {recommendations.map((product) => (
                    <div key={product._id} className="transition-all duration-500 hover:translate-y-[-4px]">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleAlsoBought;