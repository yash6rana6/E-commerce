import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, featuredProducts.length - itemsPerPage)
    );
  const prevSlide = () =>
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));

  if (!Array.isArray(featuredProducts) || featuredProducts.length === 0) {
    return (
      <p className="text-center text-stone-500 font-serif italic py-20 dark:text-stone-400">
        Our curated selection is arriving soon.
      </p>
    );
  }

  return (
    <div className="py-20 bg-[#F5F5DC]/20 dark:bg-[#0A0A0A]/50 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-center text-4xl sm:text-6xl font-serif text-stone-900 dark:text-stone-100 mb-4 italic">
            Featured Collection
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37]" />
        </div>

        <div className="relative group">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex / featuredProducts.length) * 100}%)`,
              }}
            >
              {featuredProducts.map((product, index) => (
                <div
                  key={product?._id || product?.name || index}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4"
                >
                  {/* Product Card */}
                  <div className="bg-white dark:bg-[#141413] rounded-sm shadow-sm overflow-hidden h-full flex flex-col border border-stone-100 dark:border-stone-800 transition-all duration-500 hover:shadow-2xl hover:border-[#D4AF37]/30 group/card">
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img
                        src={product?.image || "/placeholder.jpg"}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-110"
                      />
                      {/* Subtle Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-500" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow text-center">
                      <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 dark:text-stone-400 mb-2">
                        {product?.name || "Untitled Piece"}
                      </h3>
                      <p className="text-[#D4AF37] font-serif text-xl mb-6">
                        ${product?.price ? product.price.toLocaleString() : "0.00"}
                      </p>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-auto w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] uppercase tracking-[0.2em] font-bold py-4 px-4 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-4 rounded-full shadow-2xl transition-all duration-300 z-30 ${
              currentIndex === 0
                ? "bg-white/50 dark:bg-stone-900/50 text-stone-300 dark:text-stone-700 opacity-0 cursor-not-allowed"
                : "bg-white dark:bg-[#1A1A19] text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] border border-stone-100 dark:border-stone-800"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= featuredProducts.length - itemsPerPage}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-4 rounded-full shadow-2xl transition-all duration-300 z-30 ${
              currentIndex >= featuredProducts.length - itemsPerPage
                ? "bg-white/50 dark:bg-stone-900/50 text-stone-300 dark:text-stone-700 opacity-0 cursor-not-allowed"
                : "bg-white dark:bg-[#1A1A19] text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] border border-stone-100 dark:border-stone-800"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;