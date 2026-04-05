import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    num: "01",
    icon: "psychology",
    title: "Discovery & Profiling",
    desc: "Our process begins with a deep-dive diagnostic into your academic history, career aspirations, and financial parameters to build a bespoke institutional roadmap.",
    items: ["Psychometric Aptitude Analysis", "Course-University Synergy Matching"],
  },
  {
    num: "02",
    icon: "description",
    title: "Strategic Admission Support",
    desc: "Crafting narratives that resonate. We specialize in SOP refinement and documentation management that elevates your application above the global standard.",
    items: ["Narrative-Driven SOP Workshops", "Portfolio & Documentation Audit"],
  },
  {
    num: "03",
    icon: "verified_user",
    title: "Visa & Compliance Command",
    desc: "Our visa specialists operate with a near-perfect success rate, handling complex immigration portfolios with forensic precision.",
    items: ["Financial Document Forensics", "Mock Interview Simulations"],
  },
  {
    num: "04",
    icon: "flight_takeoff",
    title: "Pre-Departure & Integration",
    desc: "We ensure a seamless transition from acceptance to arrival, covering every logistic and cultural detail for a stress-free departure.",
    items: ["Accommodation Procurement", "Cultural Integration Modules"],
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-surface">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative px-12 py-18 max-w-6xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-xs tracking-wider uppercase mb-6">
                Institutional Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15] mb-8">
                Comprehensive <br />Consultancy <br /><span className="text-secondary">Ecosystem</span>
              </h1>
              <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
                Moving beyond placement. We curate academic journeys through rigorous documentation, strategic profiling, and long-term integration support for the global student.
              </p>
            </div>
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-highest">
                <img className="w-full h-full object-cover" alt="Library interior" src="/assets/services_hero.png" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, i) => (
                <div key={service.num} className={`bg-surface-container-lowest p-10 rounded-2xl shadow-[0_12px_40px_-5px_rgba(25,28,30,0.05)] transition-all duration-500 group border border-gray-100 ${i % 2 === 1 ? "md:mt-12" : ""}`}>
                  <div className="flex items-start justify-between mb-12">
                    <span className="material-symbols-outlined text-4xl text-secondary bg-surface-container-low p-4 rounded-xl">{service.icon}</span>
                    <span className="text-surface-container-highest text-6xl font-black italic opacity-20">{service.num}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-on-surface-variant mb-8 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center text-sm font-medium text-on-surface">
                        <span className="material-symbols-outlined text-secondary mr-2 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why TGE */}
        <section className="py-20 px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary mb-4">The TGE Difference</h2>
            <h3 className="text-4xl font-bold text-primary tracking-tight">Why Top Students Choose Us</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "shield", title: "98% Visa Success", desc: "Industry-leading visa approval rate backed by meticulous documentation." },
              { icon: "groups", title: "5000+ Students", desc: "A growing alumni network across 15+ countries and counting." },
              { icon: "handshake", title: "450+ Partners", desc: "Direct partnerships with top-tier global universities." },
            ].map((item) => (
              <div key={item.title} className="text-center p-10 rounded-2xl bg-surface-container-low border border-gray-100/50">
                <span className="material-symbols-outlined text-5xl text-secondary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-12">
          <div className="max-w-6xl mx-auto">
            <div
              className="rounded-2xl px-10 py-16 text-center"
              style={{
                background: "linear-gradient(135deg, #0d2550 0%, #1a4a8c 60%, #1e5299 100%)",
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Take the first step towards a global future. Our consultants are ready to assist you today.
              </p>
              <a
                href="/consultation"
                className="inline-block bg-cta-orange text-white px-10 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book Your Free Consultation
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

