import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user && user.role === "admin";
  const { cart } = useCartStore();

  return (
    // Header: Light mode mein cream-white, Dark mode mein deep matte black with frosted effect
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl z-50 transition-all duration-500 border-b border-stone-100 dark:border-stone-900 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link
            to="/"
            className="text-2xl font-serif tracking-tighter text-stone-900 dark:text-stone-100 flex items-center gap-2 group"
          >
            <span className="font-light tracking-[0.3em] uppercase text-xl group-hover:text-[#D4AF37] transition-colors duration-500">Luxe</span>
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1 animate-pulse"></span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-8">
            {/* Main Navigation Links */}
            <Link
              to="/"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-[#D4AF37] transition-colors duration-300"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300"
              >
                <ShoppingCart size={19} strokeWidth={1.5} />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow-lg">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="group flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-sm hover:bg-[#D4AF37] hover:text-white dark:hover:text-stone-900 transition-all duration-500"
              >
                <Lock size={12} />
                <span className="hidden xs:inline">Admin</span>
              </Link>
            )}

            <div className="h-4 w-[1px] bg-stone-200 dark:bg-stone-800 hidden md:block"></div>

            {user ? (
              <button
                onClick={logout}
                className="group flex items-center gap-2 text-stone-500 dark:text-stone-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-300"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold">Log Out</span>
              </button>
            ) : (
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  to="/login"
                  className="text-[10px] uppercase tracking-widest font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-2.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all duration-500 shadow-xl"
                >
                  Join
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;