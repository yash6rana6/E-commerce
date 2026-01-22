import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const { createProduct, loading } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
        } catch {
            console.log("error creating a product");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Shared style for input fields: Added dark mode support
    const inputStyle = `mt-1 block w-full bg-white dark:bg-[#1A1A19] border border-stone-200 
                        dark:border-stone-800 rounded-sm py-2.5 px-3 text-stone-900 
                        dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 
                        focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-300`;

    return (
        <motion.div
            // Card: Transitions to Deep Matte Black in Dark Mode
            className='bg-white dark:bg-[#141413] shadow-2xl border border-stone-200 dark:border-stone-800 rounded-sm p-8 mb-8 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-serif text-stone-900 dark:text-stone-100 mb-6 border-b border-stone-200 dark:border-stone-800 pb-4 italic'>
                Product Registration
            </h2>

            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <label htmlFor='name' className='block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className={inputStyle}
                        placeholder="e.g. Silk Evening Gown"
                        required
                    />
                </div>

                <div>
                    <label htmlFor='description' className='block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows='3'
                        className={inputStyle}
                        placeholder="Describe the craftsmanship..."
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor='price' className='block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400'>
                            Price (USD)
                        </label>
                        <input
                            type='number'
                            id='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            step='0.01'
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor='category' className='block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400'>
                            Category
                        </label>
                        <select
                            id='category'
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className={inputStyle}
                            required
                        >
                            <option value='' className="dark:bg-stone-900">Select...</option>
                            {categories.map((category) => (
                                <option key={category} value={category} className="dark:bg-stone-900">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Upload Section: Updated for dark mode visibility */}
                <div className='mt-2 flex items-center justify-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-sm p-4 bg-stone-50/50 dark:bg-stone-900/30'>
                    <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
                    <label
                        htmlFor='image'
                        className='cursor-pointer flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-[#D4AF37] transition-colors font-medium text-sm'
                    >
                        <Upload className='h-5 w-5' />
                        {newProduct.image ? 'Change Selection' : 'Upload Asset'}
                    </label>
                    {newProduct.image && <span className='ml-3 text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest'>Ready</span>}
                </div>

                <button
                    type='submit'
                    className='w-full flex justify-center py-3 px-4 border border-transparent rounded-sm 
                    shadow-lg text-xs font-bold uppercase tracking-[0.3em] text-white dark:text-stone-900 
                    bg-stone-900 dark:bg-stone-100 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] 
                    dark:hover:text-white transition-all duration-500
                    focus:outline-none disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? (
                        <Loader className='mr-2 h-5 w-5 animate-spin' />
                    ) : (
                        <>
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Add to Collection
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;