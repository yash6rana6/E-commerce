import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Icons for toggle

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
    const { user, checkAuth, checkingAuth } = useUserStore();
    const { getCartItems } = useCartStore();
    
    // --- Dark Mode Logic Start ---
    const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);
    // --- Dark Mode Logic End ---

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!user) return;
        getCartItems();
    }, [getCartItems, user]);

    if (checkingAuth) return <LoadingSpinner />;

    return (
        /* Dark mode switch classes added here */
        <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#0F0F0E] text-white" : "bg-[#F9F8F3] text-stone-900"}`}>
            
            {/* Background gradient - Dynamic base on theme */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute inset-0'>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-50 
                        ${isDark 
                            ? 'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0.8)_100%)]' 
                            : 'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,rgba(255,255,255,0)_70%)]'
                        }`} 
                    />
                </div>
            </div>

            <div className='relative z-50 pt-20'>
                <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                
                {/* Floating Toggle Button */}
                <button 
                    onClick={toggleTheme}
                    className="fixed bottom-6 right-6 z-[100] p-3 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black shadow-xl hover:scale-110 transition-all border border-stone-700 dark:border-stone-200"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
                    <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
                    <Route
                        path='/secret-dashboard'
                        element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
                    />
                    <Route path='/category/:category' element={<CategoryPage />} />
                    <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
                    <Route
                        path='/purchase-success'
                        element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
                    />
                    <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
                </Routes>
            </div>
            <Toaster />
        </div>
    );
}

export default App;