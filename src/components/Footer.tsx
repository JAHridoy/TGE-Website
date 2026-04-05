import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="mb-6">
              <img 
                src="/logo.png" 
                alt="Titas Global Education Logo" 
                className="h-14 w-28 object-contain bg-white p-1" 
              />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Titas Global Education — Your trusted partner for international academic excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Services</Link></li>
                <li><Link to="/countries" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Countries</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-secondary">Destinations</h4>
              <ul className="space-y-3">
                <li><span className="text-primary-foreground/70 text-sm hover:text-primary-foreground cursor-pointer transition-colors">United Kingdom</span></li>
                <li><span className="text-primary-foreground/70 text-sm hover:text-primary-foreground cursor-pointer transition-colors">Australia</span></li>
                <li><span className="text-primary-foreground/70 text-sm hover:text-primary-foreground cursor-pointer transition-colors">Canada</span></li>
                <li><span className="text-primary-foreground/70 text-sm hover:text-primary-foreground cursor-pointer transition-colors">Hungary</span></li>
                <li><span className="text-primary-foreground/70 text-sm hover:text-primary-foreground cursor-pointer transition-colors">Malaysia</span></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-secondary">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg mt-0.5">location_on</span>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  House: 06, Road: 03, Block: J, Baridhara, Dhaka-1212, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">call</span>
                <a href="tel:+8801335115769" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">+880 13351 15769</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">mail</span>
                <a href="mailto:edu@titasltd.com" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">edu@titasltd.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">© 2024 Titas Global Education. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

