import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-surface">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-24 pb-18 px-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center overflow-hidden">
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low text-secondary font-semibold text-xs tracking-wider uppercase">
            <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Trusted by 5000+ Students
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15]">
            Start Your Global <br />Education Journey <br />with <span className="text-secondary">Confidence</span>
          </h1>
          <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">
            We guide you through every step — from choosing the right country to securing your visa. Expert consultancy for a brighter future.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/consultation" className="bg-cta-orange text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Book Free Consultation
            </Link>
            <Link to="/countries" className="border-2 border-secondary text-secondary px-7 py-3 rounded-xl font-bold text-sm hover:bg-secondary/5 transition-all">
              Explore Countries
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 asymmetric-shape"></div>
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-highest">
            <img
              alt="Student at university campus"
              className="w-full h-[460px] object-cover"
              src="/assets/homepage_hero.png"
            />
          </div>
          {/* Floating Stat Card */}
          <div className="absolute -bottom-6 -left-12 bg-surface-container-lowest p-5 rounded-2xl shadow-xl hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">98%</p>
                <p className="text-xs text-on-surface-variant font-medium">Visa Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Section */}
      <section className="bg-surface-container-low py-20 px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: "security", title: "Verified Process", desc: "Our methodologies are vetted by international standards, ensuring your documents meet every requirement." },
              { icon: "visibility", title: "Transparent Guidance", desc: "No hidden fees, no false promises. Just clear, honest communication about your prospects and costs." },
              { icon: "workspace_premium", title: "High Visa Focus", desc: "We specialize in countries with high approval rates and favorable student policies for international applicants." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-4 p-8 bg-surface-container-lowest rounded-2xl shadow-[0_12px_40px_-5px_rgba(25,28,30,0.05)] transition-transform hover:-translate-y-1">
                <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">Explore Destinations</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Where Will Your Story Begin?</h3>
          </div>
          <Link to="/countries" className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All Countries
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "United Kingdom", subtitle: "Academic Excellence", img: "/assets/uk_hero.png", link: "/countries/uk" },
            { name: "Australia", subtitle: "Innovation Hub", img: "/assets/australia_hero.png", link: "/countries/australia" },
            { name: "Hungary", subtitle: "Academic Heritage", img: "/assets/hungary_hero.png", link: "/countries/hungary" },
            { name: "Malaysia", subtitle: "Diverse Excellence", img: "/assets/malaysia_hero.png", link: "/countries/malaysia" },
          ].map((country) => (
            <Link key={country.name} to={country.link} className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6 bg-surface-container-highest">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={country.img} alt={country.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-primary-foreground text-xl font-bold">{country.name}</h4>
                  <p className="text-primary-foreground/80 text-sm">{country.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-14 bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-6xl mx-auto px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Our Seamless Process</h2>
            <p className="text-primary-foreground/60 text-sm max-w-xl mx-auto">Five simple steps to take you from your home country to your dream university campus.</p>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-10 md:gap-8">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
            
            {/* Mobile Vertical Line */}
            <div className="block md:hidden absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"></div>

            {[
              { icon: "chat", title: "Consultation", desc: "Identifying your goals and best-fit options.", color: "bg-secondary" },
              { icon: "account_balance", title: "Selection", desc: "Shortlisting top universities and programs.", color: "bg-secondary" },
              { icon: "edit_document", title: "Application", desc: "Managing documentation and submissions.", color: "bg-secondary" },
              { icon: "verified_user", title: "Visa Processing", desc: "Expert handling of your visa file.", color: "bg-secondary" },
              { icon: "flight_takeoff", title: "Departure", desc: "Pre-departure briefing and travel help.", color: "bg-cta-orange" },
            ].map((step) => (
              <div key={step.title} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center group w-full md:w-auto">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-0 md:mb-4 mr-6 md:mr-0 group-hover:scale-110 transition-transform shadow-lg ring-4 ring-primary ring-opacity-10`}>
                  <span className="material-symbols-outlined text-xl text-primary-foreground">{step.icon}</span>
                </div>
                <div className="pt-2 md:pt-0">
                  <h4 className="text-sm md:text-base font-bold mb-1 text-primary-foreground">{step.title}</h4>
                  <p className="text-primary-foreground/60 text-xs leading-relaxed max-w-[200px] md:max-w-[130px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-12 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight leading-tight">Comprehensive Support <br />For Every Student</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: "forum", title: "Counseling", desc: "Personalized career paths and psychological support." },
                { icon: "task", title: "Admission", desc: "End-to-end management of university offer letters." },
                { icon: "travel_explore", title: "Visa Guidance", desc: "Rigorous document review and interview prep." },
                { icon: "house", title: "Post-Arrival", desc: "Accommodation help and local orientation." },
              ].map((service) => (
                <div key={service.title} className="p-6 rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-xl transition-all duration-300">
                  <span className="material-symbols-outlined text-secondary mb-4">{service.icon}</span>
                  <h4 className="font-bold text-primary mb-2 text-lg">{service.title}</h4>
                  <p className="text-on-surface-variant text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-surface-container-highest">
              <img alt="Academic counseling session" className="w-full h-[500px] object-cover" src="https://images.unsplash.com/photo-1523240715624-890ce5225504?auto=format&fit=crop&q=80&w=1200" />
            </div>
            <div className="absolute top-8 -right-8 bg-surface-container-lowest py-3 px-6 rounded-full shadow-lg flex items-center gap-2 hidden lg:flex">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              <span className="text-sm font-bold text-primary">Global University Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface-container-low overflow-hidden">
        <div className="max-w-6xl mx-auto px-12">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Nusrat Jahan", program: "MS Data Science, Malaysia", quote: "TGE made the complex visa process for Malaysia feel like a breeze. Their team in Dhaka was available 24/7 to support my journey.", img: "/nusrat_jahan_testimonial_1774735706466.png" },
              { name: "Ahsan Habib", program: "MBA, Hungary", quote: "I never thought I could study in Europe, but TGE found a scholarship program in Hungary that changed my life forever.", img: "/ahsan_habib_testimonial_1774735687482.png" },
              { name: "Rafiqul Islam", program: "BSc Nursing, UK", quote: "From SOP writing to visa interview prep, TGE held my hand through every challenge. I'm now studying at my dream university in London.", img: "/rafiqul_islam_testimonial_1774735723351.png" },
            ].map((story, i) => (
              <div key={story.name} className={`bg-surface-container-lowest p-8 rounded-3xl shadow-[0_12px_40px_-5px_rgba(25,28,30,0.05)] flex flex-col h-full ${i === 1 ? "md:-translate-y-4" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest">
                    <img alt={story.name} src={story.img} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary">{story.name}</h5>
                    <p className="text-xs text-secondary font-semibold">{story.program}</p>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed italic mb-6">"{story.quote}"</p>
                <div className="mt-auto flex text-cta-orange">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <Link
              to="/consultation"
              className="inline-block bg-cta-orange text-white px-10 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

