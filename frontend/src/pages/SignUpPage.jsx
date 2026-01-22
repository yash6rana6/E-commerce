import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup, loading } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className='min-h-screen bg-[#F9F8F3] dark:bg-[#0A0A0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-700'>
            {/* Minimalist Branding Header */}
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md px-4'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="flex justify-center mb-6">
                    <div className="h-10 w-[1px] bg-[#D4AF37]" />
                </div>
                <h2 className='text-center text-4xl font-serif text-stone-900 dark:text-stone-100 italic tracking-tight'>
                    Begin Your Journey
                </h2>
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mt-3">
                    Establish your studio identity
                </p>
            </motion.div>

            {/* Registration Card */}
            <motion.div
                className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className='bg-white dark:bg-[#0F0F0E] py-12 px-8 shadow-[0_30px_60px_rgba(0,0,0,0.04)] dark:shadow-none border border-stone-100 dark:border-stone-900 sm:rounded-sm sm:px-12 mx-4 sm:mx-0'>
                    <form onSubmit={handleSubmit} className='space-y-7'>
                        
                        {/* Name Input */}
                        <div className="group">
                            <label htmlFor='name' className='block text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-600 mb-2 transition-colors group-focus-within:text-[#D4AF37]'>
                                Full Identity
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none'>
                                    <User className='h-4 w-4 text-stone-200 dark:text-stone-800' strokeWidth={1.5} />
                                </div>
                                <input
                                    id='name'
                                    type='text'
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className='block w-full pl-8 pr-3 py-3 bg-transparent border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-300 dark:placeholder-stone-800 focus:outline-none focus:border-[#D4AF37] transition-all sm:text-sm rounded-none'
                                    placeholder='e.g. Julian Vane'
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <label htmlFor='email' className='block text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-600 mb-2 transition-colors group-focus-within:text-[#D4AF37]'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none'>
                                    <Mail className='h-4 w-4 text-stone-200 dark:text-stone-800' strokeWidth={1.5} />
                                </div>
                                <input
                                    id='email'
                                    type='email'
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className='block w-full pl-8 pr-3 py-3 bg-transparent border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-300 dark:placeholder-stone-800 focus:outline-none focus:border-[#D4AF37] transition-all sm:text-sm rounded-none'
                                    placeholder='name@studio.com'
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-4">
                            <div className="group">
                                <label className='block text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-600 mb-2'>
                                    Secret Key
                                </label>
                                <input
                                    type='password'
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className='block w-full px-0 py-3 bg-transparent border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-300 focus:outline-none focus:border-[#D4AF37] transition-all sm:text-sm rounded-none'
                                    placeholder='••••••••'
                                />
                            </div>
                            <div className="group">
                                <label className='block text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-600 mb-2'>
                                    Verify Key
                                </label>
                                <input
                                    type='password'
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className='block w-full px-0 py-3 bg-transparent border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-300 focus:outline-none focus:border-[#D4AF37] transition-all sm:text-sm rounded-none'
                                    placeholder='••••••••'
                                />
                            </div>
                        </div>

                        {/* Primary Button */}
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center items-center py-5 px-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden shadow-lg'
                            disabled={loading}
                        >
                            <span className="relative z-10 flex items-center">
                                {loading ? (
                                    <Loader className='h-4 w-4 animate-spin' />
                                ) : (
                                    <>
                                        Request Membership
                                        <ArrowRight className='ml-3 h-3 w-3 group-hover:translate-x-2 transition-transform duration-500' />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Footer Toggle */}
                    <div className='mt-12 text-center border-t border-stone-50 dark:border-stone-900 pt-8'>
                        <p className='text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-widest'>
                            Already registered? <br />
                            <Link to='/login' className='inline-block mt-3 font-bold text-stone-900 dark:text-stone-100 hover:text-[#D4AF37] transition-colors border-b border-stone-900 dark:border-stone-100 hover:border-[#D4AF37] pb-0.5'>
                                Access Registry
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;