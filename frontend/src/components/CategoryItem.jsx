import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
    return (
        // Background: Light mein stone-100, Dark mein deep matte black (#0F0F0E)
        <div className='relative overflow-hidden h-[500px] w-full rounded-sm group bg-stone-100 dark:bg-[#0F0F0E] border border-stone-100 dark:border-stone-900'>
            <Link to={"/category" + category.href}>
                <div className='w-full h-full cursor-pointer relative'>
                    
                    {/* Overlay: Dark mode mein hum gradient ko thoda zyada "Rich" karenge */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/20 to-stone-950/90 z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-500' />
                    
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className='w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110'
                        loading='lazy'
                    />

                    {/* Text Content */}
                    <div className='absolute bottom-0 left-0 right-0 p-10 z-20 flex flex-col items-center text-center'>
                        {/* Category Name */}
                        <h3 className='text-white text-3xl md:text-4xl font-serif tracking-wide mb-3 drop-shadow-2xl'>
                            {category.name}
                        </h3>
                        
                        {/* Divider Line: Gold accent - transitions to wider on hover */}
                        <div className='w-12 h-[1px] bg-[#D4AF37] mb-6 transition-all duration-700 ease-out group-hover:w-32' />

                        {/* CTA: Exploring minimalist vibe */}
                        <p className='text-stone-300 dark:text-stone-400 text-[10px] uppercase tracking-[0.3em] font-semibold opacity-0 translate-y-6 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0'>
                            Explore Collection
                        </p>
                    </div>

                    {/* Framing Effect: Premium look for dark mode */}
                    <div className='absolute inset-6 border border-white/10 dark:border-white/5 z-30 pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:inset-4' />
                </div>
            </Link>
        </div>
    );
};

export default CategoryItem;