import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Countries", path: "/countries" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/consultation" },
];

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-6xl mx-auto relative z-[101]">
        <Link 
          to="/" 
          className="flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <img 
            src="/logo.png" 
            alt="Titas Global Education Logo" 
            className="h-10 w-20 object-contain bg-white" 
          />
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-body text-sm font-medium tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                location.pathname === link.path
                  ? "text-secondary font-bold border-b-2 border-secondary pb-1"
                  : "text-on-surface-variant hover:text-primary transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/consultation"
            className="hidden sm:block bg-cta-orange text-white px-7 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all duration-200 active:scale-95 shadow-sm"
          >
            Book Consultation
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary hover:bg-gray-100 rounded-lg md:hidden transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="material-symbols-outlined text-3xl select-none">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[90] md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: '80px' }}
      >
        <div className="flex flex-col h-full bg-white px-8 py-10 space-y-8 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between text-lg font-medium tracking-tight py-4 border-b border-gray-50 transition-all group ${
                  location.pathname === link.path
                    ? "text-secondary pl-2 border-l-4 border-l-secondary"
                    : "text-primary/70 active:text-primary pl-0"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-xl opacity-60 group-active:opacity-100">
                    {link.label === "Home" ? "home" : 
                     link.label === "Countries" ? "public" : 
                     link.label === "Services" ? "auto_awesome" : 
                     link.label === "About" ? "info" : "mail"}
                  </span>
                  {link.label}
                </div>
                <span className="material-symbols-outlined text-lg opacity-40">chevron_right</span>
              </Link>
            ))}
          </div>
          
          <div className="pt-2">
            <Link
              to="/consultation"
              className="block w-full bg-cta-orange text-white text-center py-4 rounded-xl font-bold text-lg shadow-md active:scale-[0.98] transition-all"
            >
              Book Consultation
            </Link>
          </div>
          
          <div className="pt-8 border-t border-gray-100 mt-auto pb-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Expert Global Guidance</p>
            <div className="flex gap-8 justify-center">
              <span className="material-symbols-outlined text-primary/40 scale-125 hover:text-secondary transition-colors cursor-pointer">facebook</span>
              <span className="material-symbols-outlined text-primary/40 scale-125 hover:text-secondary transition-colors cursor-pointer">public</span>
              <span className="material-symbols-outlined text-primary/40 scale-125 hover:text-secondary transition-colors cursor-pointer">alternate_email</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
