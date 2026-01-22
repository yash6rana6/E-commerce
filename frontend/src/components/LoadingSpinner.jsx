const LoadingSpinner = () => {
    return (
        // Background: Matte deep black to match the luxury theme
        <div className='flex items-center justify-center min-h-screen bg-[#0A0A0A]'>
            <div className='relative flex flex-col items-center gap-6'>
                <div className='relative'>
                    {/* Outer Ring: Very subtle stone color */}
                    <div className='w-16 h-16 border-stone-800 border-[1px] rounded-full' />
                    
                    {/* Inner Spinner: Signature Gold accent with a thin, elegant line */}
                    <div className='w-16 h-16 border-[#D4AF37] border-t-[1px] animate-spin rounded-full absolute left-0 top-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]' />
                </div>

                {/* Loading Text: Minimalist serif style */}
                <div className="flex flex-col items-center">
                    <span className='text-[10px] uppercase tracking-[0.4em] font-light text-stone-400 animate-pulse'>
                        Loading
                    </span>
                    {/* Tiny gold dot indicator */}
                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2" />
                </div>

                <div className='sr-only'>Please wait, the collection is loading.</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;