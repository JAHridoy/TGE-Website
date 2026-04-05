import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const HungaryPage = () => {
  const benefits = [
    {
      icon: "euro_symbol",
      title: "Cost-Effective EU",
      desc: "Get high-quality EU-recognized degrees at a fraction of the cost found in Western Europe or the US.",
      color: "bg-primary-container/5",
      textColor: "text-primary-container"
    },
    {
      icon: "workspace_premium",
      title: "EU Standard Degrees",
      desc: "Fully accredited degrees recognized globally and across all European Union member states.",
      color: "bg-secondary/5",
      textColor: "text-secondary"
    },
    {
      icon: "explore",
      title: "Schengen Gateway",
      desc: "Perfectly located in the heart of Europe, offering safe living and easy travel across the continent.",
      color: "bg-cta-orange/5",
      textColor: "text-cta-orange"
    }
  ];

  const quickStats = [
    { label: "Capital", value: "Budapest", icon: "location_city" },
    { label: "Currency", value: "HUF / Euro", icon: "payments" },
    { label: "Intake", value: "Sept / Feb", icon: "calendar_month" },
    { label: "Work Rights", value: "24h / Week", icon: "work" },
  ];

  const universities = [
    {
      name: "Eötvös Loránd University",
      location: "Budapest • Research Leader",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Hungary"
    },
    {
      name: "University of Debrecen",
      location: "Debrecen • Medical Excellence",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Hungary"
    },
    {
      name: "University of Pecs",
      location: "Pecs • Innovation Hub",
      img: "https://images.unsplash.com/photo-1523050853064-db0ef93d484d?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Hungary"
    }
  ];

  const financialData = [
    { category: "Undergraduate Tuition", range: "€2,500 – €6,000", period: "Per Academic Year", icon: "school" },
    { category: "Postgraduate Tuition", range: "€3,000 – €8,000", period: "Per Academic Year", icon: "workspace_premium" },
    { category: "Living Expenses", range: "€500 – €700", period: "Monthly Average", icon: "home" },
    { category: "Application Fees", range: "€100 – €200", period: "One-Time Average", icon: "payments" },
  ];

  const admissionRequirements = [
    { title: "Academic Credentials", list: ["HSC (min 2.5/5.0 GPA) for Bachelors", "Bachelors Degree for Masters applicants", "Official transcripts and diploma translations"] },
    { title: "Entrance Assessments", list: ["Many unis require a short online test", "Skype/Zoom interviews for motivation", "Specific Biology/Chem tests for Medicine"] },
    { title: "Language Proficiency", list: ["IELTS Academic (6.0 overall)", "PTE Academic (55+) accepted", "Medium of Instruction (MOI) for some cases"] },
  ];

  const faqs = [
    { q: "Is a Hungary study visa valid for other EU countries?", a: "Yes! Hungary is a Schengen member. Your D-type residence permit allows you to travel freely across the 29 Schengen member states for up to 90 days in any 180-day period." },
    { q: "What is the Stipendium Hungaricum Scholarship?", a: "It's a prestigious Hungarian government scholarship. It covers full tuition, provides a monthly stipend, and includes medical insurance. TGE helps you navigate the application process." },
    { q: "Can I stay in Hungary after graduation?", a: "Graduates can apply for a 'Study-to-Work' residence permit (valid for up to 9 months) to find employment or start a business in Hungary." },
    { q: "Are medical degrees from Hungary recognized globally?", a: "Yes, Hungarian medical degrees (General Medicine, Dentistry, Pharmacy) are highly regarded in the EU, USA, UK, and Israel, often requiring only local licensing exams." }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center overflow-hidden mb-20">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-xs tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              Study Destination: Hungary
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15]">
              Affordable Excellence in the <span className="text-secondary">Heart of Central Europe</span>
            </h1>
            <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">
              Discover a rich historical academic tradition in Hungary, offering top-tier EU-recognized degrees and a vibrant Schengen experience at an accessible cost.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link 
                to="/consultation?country=Hungary"
                className="bg-cta-orange text-white px-7 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book Hungary Consultation
              </Link>
              <Link
                to="/countries"
                className="border-2 border-secondary text-secondary px-7 py-3 rounded-xl font-bold text-sm hover:bg-secondary/5 transition-all text-center"
              >
                Explore Programs
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-outline-variant/30">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-base">{stat.icon}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-sm font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 asymmetric-shape"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-highest">
              <img 
                className="w-full h-[460px] object-cover" 
                alt="Hungarian University Campus" 
                src="https://images.unsplash.com/photo-1551842915-1815db45ec59?auto=format&fit=crop&q=80&w=1200"
              />
            </div>
            <div className="absolute -bottom-6 -left-8 bg-surface-container-lowest p-5 rounded-2xl shadow-xl hidden lg:block border border-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>currency_exchange</span>
                <span className="text-sm font-bold text-primary">High ROI</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">Low living costs combined with prestigious degrees ensure ultimate value.</p>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Why Students Choose Hungary</h2>
              <p className="text-on-surface-variant text-sm">A strategic blend of affordability, quality, and Central European opportunity makes Hungary a hidden gem for global learners.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_12px_40_rgba(25,28,30,0.05)] transition-all hover:-translate-y-1 group">
                  <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined ${benefit.textColor} text-2xl`}>{benefit.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Universities Section */}
        <section className="py-20 px-12 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">Institutional Partnerships</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Elite Hungarian Universities</h2>
            </div>
            <Link to="/countries" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All Destinations
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((uni) => (
              <div key={uni.name} className="group cursor-pointer">
                <div className="relative h-72 rounded-2xl overflow-hidden mb-6 bg-surface-container-highest">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={uni.img} alt={uni.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 pr-6">
                    <h4 className="text-primary-foreground text-xl font-bold mb-1">{uni.name}</h4>
                    <p className="text-primary-foreground/80 text-sm mb-4">{uni.location}</p>
                    <Link 
                      to={uni.link} 
                      className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-secondary hover:text-white transition-all"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Detailed Content Deep-Dive */}
        <section className="py-24 px-4 md:px-12 max-w-6xl mx-auto space-y-32">
          
          {/* Financial Roadmap Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h3 className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">Financial Roadmap</h3>
              <h2 className="text-4xl font-bold text-primary tracking-tight mb-6">Central European Value Strategy</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Hungary remains one of the few EU destinations where high-quality medical, engineering, and business education is paired with surprisingly low cost-of-living.
              </p>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                  <p className="text-xs font-bold text-primary uppercase">Scholarship Alert</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The **Stipendium Hungaricum** scholarship provides a full tuition waiver, monthly stipend, and free dormitory placement for selected scholars from Bangladesh.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {financialData.map((item) => (
                <div key={item.category} className="bg-surface-container-lowest p-8 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-secondary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <h4 className="font-bold text-primary mb-1 text-sm">{item.category}</h4>
                  <p className="text-2xl font-bold text-secondary mb-1">{item.range}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">{item.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Gateway Section */}
          <div className="bg-surface-container-low rounded-[32px] px-2 py-10 md:p-20 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h3 className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">Admission Gateway</h3>
                <h2 className="text-4xl font-bold text-primary tracking-tight mb-8">EU Standard Entry Pathway</h2>
                <div className="space-y-10">
                  {admissionRequirements.map((req, idx) => (
                    <div key={req.title} className="flex gap-6">
                      <span className="text-3xl font-bold text-secondary/30">0{idx + 1}</span>
                      <div>
                        <h4 className="font-bold text-primary mb-3">{req.title}</h4>
                        <ul className="space-y-2">
                          {req.list.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-on-surface-variant">
                              <span className="w-1 h-1 bg-secondary rounded-full"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-10">
                <div className="bg-primary text-primary-foreground p-6 md:p-10 rounded-2xl shadow-xl">
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-cta-orange">work</span>
                    Career & EU Rights
                  </h4>
                  <p className="text-sm leading-relaxed mb-6 opacity-80 italic">
                    "Studying in Hungary gives you a visa that opens the entire European Union. Your career network extends from Budapest to Berlin."
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">Stay-Back Permit:</strong> Apply for a 9-month residence permit after graduation specifically to find work.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">Business Hub:</strong> Budapest is a growing tech and startup hub with high demand for English-speaking talents.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">Schengen Mobility:</strong> Easy access to internships and professional networking across the 29 Schengen countries.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-cta-orange/5 p-6 md:p-8 rounded-2xl border border-cta-orange/20">
                  <p className="text-sm font-bold text-primary mb-3">TGE Expert Tip:</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    If applying for **Medicine or Dentistry**, be prepared for competitive entrance exams in Biology and Chemistry. We provide mock test resources to all our medical applicants.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-secondary font-bold text-xs uppercase tracking-widest mb-4">Hungary Expertise</h3>
            <h2 className="text-center text-4xl font-bold text-primary tracking-tight mb-16">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-outline-variant/30">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full py-6 flex justify-between items-center text-left hover:text-secondary transition-colors group"
                  >
                    <span className="text-base font-bold text-primary group-hover:text-secondary transition-colors pr-6">{faq.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-48 pb-6' : 'max-h-0'}`}>
                    <p className="text-sm text-on-surface-variant leading-relaxed px-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                Ready to Start Your Journey in Hungary?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Experience Central Europe's academic excellence without the high financial burden.
              </p>
              <Link
                to="/consultation?country=Hungary"
                className="inline-block bg-cta-orange text-white px-10 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book Your Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HungaryPage;
