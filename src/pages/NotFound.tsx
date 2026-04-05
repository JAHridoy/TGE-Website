import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-12 py-32">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-xs tracking-widest uppercase mb-8">
            Error 404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-8">
            Lost in <span className="text-secondary">Transition?</span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
            The academic path you're looking for seems to have shifted. Let's get you back on track to your global future.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

