import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const CyprusPage = () => {
  const benefits = [
    {
      icon: "euro_symbol",
      title: "EU Member Benefits",
      desc: "Degrees fully recognized across all 27 EU nations, providing a global qualification with European standards.",
      color: "bg-primary-container/5",
      textColor: "text-primary-container"
    },
    {
      icon: "payments",
      title: "Cost-Effective Global Ed",
      desc: "Premium education at highly competitive tuition fees (€3,500 - €8,000) compared to UK and USA counterparts.",
      color: "bg-secondary/5",
      textColor: "text-secondary"
    },
    {
      icon: "verified_user",
      title: "IELTS Waiver Pathway",
      desc: "Many elite Cyprus institutions offer English proficiency waivers for students from recognized educational backgrounds.",
      color: "bg-cta-orange/5",
      textColor: "text-cta-orange"
    }
  ];

  const universities = [
    {
      name: "University of Nicosia",
      location: "Nicosia • Top 500 Worldwide",
      img: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Cyprus"
    },
    {
      name: "UCLan Cyprus",
      location: "Larnaca • British Academic Standards",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Cyprus"
    },
    {
      name: "Neapolis University Pafos",
      location: "Pafos • Innovation Excellence",
      img: "https://images.unsplash.com/photo-1607237138185-efd9571f9f90?auto=format&fit=crop&q=80&w=800",
      link: "/consultation?country=Cyprus"
    }
  ];

  const quickStats = [
    { label: "Capital", value: "Nicosia", icon: "location_city" },
    { label: "Currency", value: "Euro (EUR)", icon: "payments" },
    { label: "Intake", value: "Feb / Sept", icon: "calendar_month" },
    { label: "Work Rights", value: "20h / Week", icon: "work" },
  ];

  const steps = [
    { id: "01", title: "Profile Assessment", desc: "Expert analysis of your academic background and career goals." },
    { id: "02", title: "University Selection", desc: "Shortlisting the best institutions based on your profile." },
    { id: "03", title: "Documentation & Visa", desc: "Hassle-free management of your application and visa filing." },
    { id: "04", title: "Departure Orientation", desc: "Pre-departure briefing and on-ground settlement support.", icon: "flight_takeoff" }
  ];

  const faqs = [
    { q: "Can international students work while studying in Cyprus?", a: "Yes, non-EU students are legally permitted to work part-time for up to 20 hours per week during the academic term and full-time during official university holidays, typically in sectors like hospitality, services, and IT." },
    { q: "Is a Cyprus degree recognized in other European countries?", a: "Absolutely. Cyprus follows the Bologna Process, meaning its degrees are part of the European Higher Education Area (EHEA) and are fully recognized for further study or employment across all 27 EU member states." },
    { q: "What are the common intake periods for Cyprus universities?", a: "There are two primary intakes: Fall (September/October), which offers the widest range of programs, and Spring (February), which is ideal for students who miss the autumn deadline." },
    { q: "Are English proficiency tests like IELTS mandatory?", a: "While many universities require IELTS (typically 5.5 to 6.5), several elite partner institutions offer waivers based on your medium of instruction at your previous academic level or internal placement tests." }
  ];

  const financialData = [
    { category: "Undergraduate Tuition", range: "€3,500 – €6,000", period: "Per Academic Year", icon: "school" },
    { category: "Postgraduate Tuition", range: "€4,500 – €8,000", period: "Per Academic Year", icon: "workspace_premium" },
    { category: "Living Expenses", range: "€450 – €600", period: "Monthly Average", icon: "home" },
    { category: "Application Fee", range: "€50 – €150", period: "One-Time Payment", icon: "description" },
  ];

  const admissionRequirements = [
    { title: "Academic Credentials", list: ["12th Grade Certificate (HSC) for Bachelors", "Honors Degree for Masters applications", "Official Transcripts with minimum 50% marks"] },
    { title: "Essential Documents", list: ["Valid Passport (at least 2 years validity)", "Statement of Purpose (SOP)", "Two Academic Letters of Recommendation"] },
    { title: "Health & Character", list: ["General Medical Clearance", "Police Clearance Certificate", "Student Health Insurance cover"] },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center overflow-hidden mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-xs tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              Study Destination: Cyprus
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15]">
              Mediterranean Academic Excellence: Your <span className="text-secondary">Strategic Gateway</span>
            </h1>
            <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">
              Experience the perfect blend of high-quality education and a vibrant Mediterranean lifestyle. Cyprus offers a secure, high-ROI educational hub with direct access to European standards.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/consultation?country=Cyprus"
                className="bg-cta-orange text-white px-7 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book Cyprus Consultation
              </Link>
              <button className="border-2 border-secondary text-secondary px-7 py-3 rounded-xl font-bold text-sm hover:bg-secondary/5 transition-all">
                Explore Programs
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-outline-variant/30 text-left">
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
                alt="Mediterranean University Campus"
                src="https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&q=80&w=1200"
              />
            </div>
            <div className="absolute -bottom-6 -left-8 bg-surface-container-lowest p-5 rounded-2xl shadow-xl hidden lg:block border border-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="text-sm font-bold text-primary">EU Standards</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">Accredited degrees recognized globally across Europe.</p>
            </div>
          </div>
        </section>


        {/* Key Benefits Section */}
        <section className="bg-surface-container-low py-20 px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Why Students Choose Cyprus</h2>
              <p className="text-on-surface-variant text-sm">Exceptional quality of life paired with academic rigor makes Cyprus a top-tier choice for global learners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_12px_40px_-5px_rgba(25,28,30,0.05)] transition-all hover:-translate-y-1 group">
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
              <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Elite Partner Institutions</h2>
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

        {/* Admission Roadmap */}
        <section className="py-14 bg-primary text-primary-foreground overflow-hidden">
          <div className="max-w-6xl mx-auto px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Your Journey to Cyprus</h2>
              <p className="text-primary-foreground/60 text-sm max-w-xl mx-auto">A seamless 4-step process handled by our expert curators to get you from application to campus.</p>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-10 md:gap-8 px-4">
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
              <div className="block md:hidden absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"></div>

              {steps.map((step) => (
                <div key={step.title} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center group w-full md:w-auto">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-0 md:mb-4 mr-6 md:mr-0 group-hover:scale-110 transition-transform shadow-lg ring-4 ring-primary ring-opacity-10`}>
                    {step.icon ? (
                      <span className="material-symbols-outlined text-xl text-primary-foreground">{step.icon}</span>
                    ) : (
                      <span className="text-lg font-bold text-primary-foreground">{step.id}</span>
                    )}
                  </div>
                  <div className="pt-2 md:pt-0">
                    <h4 className="text-sm md:text-base font-bold mb-1 text-primary-foreground">{step.title}</h4>
                    <p className="text-primary-foreground/60 text-xs leading-relaxed max-w-[200px] md:max-w-[140px]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-surface-container-low px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-10 tracking-tight leading-tight">Trusted by Global Bodies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {["British Council", "ICEF", "Cyprus MoE"].map((badge) => (
                  <div key={badge} className="bg-surface-container-lowest h-20 rounded-2xl flex items-center justify-center p-6 shadow-sm">
                    <span className="font-bold text-on-surface-variant text-xs uppercase tracking-widest opacity-40">{badge}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-surface-container-lowest rounded-2xl shadow-[0_12px_40px_-5px_rgba(25,28,30,0.05)] relative">
                <span className="material-symbols-outlined text-secondary text-5xl absolute -top-5 -left-5 opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                <p className="text-lg italic text-on-surface-variant leading-relaxed mb-8">
                  "Cyprus offers a unique Mediterranean education experience. The TGE team in Dhaka handled all my visa paperwork perfectly."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
                    <img className="w-full h-full object-cover" src="/sabrina_sultana_testimonial_1774735774282.png" alt="Sabrina Islam" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">Sabrina Islam</p>
                    <p className="text-xs text-secondary font-semibold">LLB (Hons), University of Cyprus</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-highest">
                <img
                  className="w-full h-[500px] object-cover"
                  alt="Mediterranean Life"
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Deep-Dive */}
        <section className="py-24 px-4 md:px-12 max-w-6xl mx-auto space-y-32">

          {/* Financial Roadmap Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h3 className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">Financial Roadmap</h3>
              <h2 className="text-4xl font-bold text-primary tracking-tight mb-6">Investment in Your Global Future</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                Cyprus offers some of the most competitive tuition fees in the European Union without compromising on academic quality. We've curated the following breakdown to help you plan your investment strategically.
              </p>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                  <p className="text-xs font-bold text-primary uppercase">Scholarship Potential</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Many of our partner institutions offer academic merit scholarships ranging from 25% to 50% tuition reduction for qualified international students.
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
                <h2 className="text-4xl font-bold text-primary tracking-tight mb-8">Streamlined Application Architecture</h2>
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
                    Career & Work Rights
                  </h4>
                  <p className="text-sm leading-relaxed mb-6 opacity-80 italic">
                    "Transition from scholar to professional in a business hub that connects Europe, Africa, and the Middle East."
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">During Studies:</strong> Legal right to work 20 hours per week in approved sectors.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">Post-Graduation:</strong> Access to the Graduate Work route to seek employment.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm pt-1">check_circle</span>
                      <p className="text-xs leading-relaxed"><strong className="text-white">Sector Focus:</strong> High demand in Tourism, IT Services, and Financial Management.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-cta-orange/5 p-6 md:p-8 rounded-2xl border border-cta-orange/20">
                  <p className="text-sm font-bold text-primary mb-3">TGE Expert Tip:</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Submit your application at least **4 months** prior to the intake. This ensures ample time for the Cyprus Ministry of Education (MoE) clearance and hassle-free visa processing.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-secondary font-bold text-xs uppercase tracking-widest mb-4">Expert Inquiries</h3>
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
                Ready to Start Your Journey in Cyprus?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join hundreds of successful students who found their global path through our institutional expertise in the Mediterranean.
              </p>
              <Link
                to="/consultation?country=Cyprus"
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

export default CyprusPage;
