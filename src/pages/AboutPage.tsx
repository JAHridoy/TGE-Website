import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="bg-surface">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-[10px] tracking-widest uppercase mb-6">
                Institutional Core
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15] mb-8">
                Precision Engineering for Global Academic <span className="text-secondary text-italic font-serif">Journeys</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mb-10">
                We combine deep-dive industry expertise with a modern, data-driven approach to architecturalize your global future.
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                Explore Our Strategy
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img className="w-full h-full object-cover" alt="Modern university library" src="/assets/about_hero.png" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-8 rounded-2xl ambient-glow hidden lg:block border border-gray-100/50">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="font-bold text-2xl text-primary">Certified</span>
                </div>
                <p className="text-sm text-on-surface-variant">Expert Advisory Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-surface-container-low py-20">
          <div className="max-w-6xl mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary mb-4">The Foundation</h2>
                <h3 className="text-4xl font-bold text-primary tracking-tight">Purpose Driven Excellence</h3>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary-foreground">diversity_3</span>
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-4">Our Mission</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    To empower students through personalized, ethical, and world-class academic advisory, fostering a borderless community of scholars and innovators.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-secondary-foreground">visibility</span>
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-4">Our Vision</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Redefining the landscape of global education by becoming the most trusted bridge between talent and international opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="py-20 bg-surface">
          <div className="max-w-6xl mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 bg-primary rounded-2xl p-12 flex flex-col justify-between text-primary-foreground relative overflow-hidden group border border-primary-container/20 shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-5xl font-bold mb-4 tracking-tighter">100%</h3>
                  <p className="text-xl opacity-80 font-light">Student-Centric Methodology</p>
                </div>
                <div className="relative z-10">
                  <p className="text-base leading-relaxed opacity-70">We prioritize architectural precision over volume, ensuring every application is a masterpiece of personal narrative and academic alignment.</p>
                </div>
                <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  <img className="w-full h-full object-cover" alt="Campus aerial" src="https://images.unsplash.com/photo-1523050853064-db0ef93d484d?auto=format&fit=crop&q=80&w=1200" />
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-8 ambient-glow flex flex-col justify-center border border-gray-100">
                <span className="text-3xl font-bold text-secondary mb-2">Success</span>
                <p className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">Driven Visa Strategy</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-8 ambient-glow flex flex-col justify-center border border-gray-100">
                <span className="text-3xl font-bold text-secondary mb-2">Global</span>
                <p className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">University Connectivity</p>
              </div>
              <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-10 flex items-center gap-8 border border-gray-100">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-primary mb-2">Ethical Standards</h4>
                  <p className="text-sm text-on-surface-variant">Zero compromise on transparency. We operate with a strictly merit-based, student-first advocacy model.</p>
                </div>
                <div className="flex -space-x-3">
                  {["Digital", "Merit", "Global"].map((badge) => (
                    <div key={badge} className="w-12 h-12 rounded-full border-4 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface">{badge}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Headquarters */}
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-6xl mx-auto px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary mb-4">Our Presence</h2>
              </div>
            </div>
            <div className="max-w-xl mx-auto md:mx-0">
              <div className="bg-surface-container-lowest p-10 rounded-2xl ambient-glow group border border-gray-100/50 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-primary">Titas Global Education</h4>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div className="space-y-6">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    House: 06, Road: 03, Block: J, Baridhara, Dhaka-1212, Bangladesh
                  </p>
                  <div className="pt-6 border-t border-outline-variant/10">
                    <a className="text-base font-bold text-primary flex items-center gap-3 hover:text-secondary transition-colors" href="tel:+8801335115769">
                      <span className="material-symbols-outlined text-secondary text-xl">call</span>
                      +880 13351 15769
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

