import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";
import { Check, Loader2, Award, Users, Clock, ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";

const ConsultationPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    city: "",
    preferredCountry: "Australia",
    programLevel: "Bachelors",
    preferredIntake: "Within 6 months",
    subjectInterest: "",
    academicBackground: "Higher Secondary",
    englishProficiency: "Planning to take IELTS",
    budgetRange: "8-12 lakh",
    passportStatus: "Ready",
    startTimeline: "Within 3 months",
    additionalNote: "",
  });

  const steps = [
    { id: 1, title: "Identity", icon: Users },
    { id: 2, title: "Interest", icon: Award },
    { id: 3, title: "Eligibility", icon: Check },
    { id: 4, title: "Finalize", icon: Clock },
  ];

  const levels = ["Foundation", "Diploma", "Bachelors", "Masters", "PhD"];
  const countries = ["Australia", "United Kingdom", "Canada", "Hungary", "Malta", "Malaysia", "Lithuania", "Cyprus"];
  const intakes = ["Next intake", "Within 3 months", "Within 6 months", "Just exploring"];
  const academicBackgrounds = ["Secondary", "Higher Secondary", "Diploma", "Bachelors", "Masters"];
  const englishProficiency = ["IELTS completed", "No IELTS", "Planning to take IELTS", "MOI / Other"];
  const budgetRanges = ["Below 5 lakh", "5-8 lakh", "8-12 lakh", "12 lakh+"];
  const passportStatuses = ["Ready", "Applied", "Not ready"];
  const timelines = ["Immediately", "This month", "In 2-3 months", "Just researching"];

  useEffect(() => {
    const countryParam = searchParams.get("country");
    if (countryParam && countries.includes(countryParam)) {
      setFormData(prev => ({ ...prev, preferredCountry: countryParam }));
    }
  }, [searchParams]);

  const calculateLeadScore = () => {
    let score = 0;
    // Budget (Max 30)
    if (formData.budgetRange === "12 lakh+") score += 30;
    else if (formData.budgetRange === "8-12 lakh") score += 25;
    else if (formData.budgetRange === "5-8 lakh") score += 15;
    else score += 5;

    // IELTS (Max 25)
    if (formData.englishProficiency === "IELTS completed") score += 25;
    else if (formData.englishProficiency === "Planning to take IELTS") score += 15;
    else score += 5;

    // Passport (Max 25)
    if (formData.passportStatus === "Ready") score += 25;
    else if (formData.passportStatus === "Applied") score += 15;
    else score += 5;

    // Timeline (Max 20)
    if (formData.startTimeline === "Immediately") score += 20;
    else if (formData.startTimeline === "This month") score += 15;
    else if (formData.startTimeline === "In 2-3 months") score += 10;
    
    return score;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    const score = calculateLeadScore();
    const temperature = score >= 70 ? "Hot" : score >= 40 ? "Warm" : "Cold";

    try {
      // Auto-Assignment Logic: Lookup expert for the country
      let assignedCounselor = "Unassigned";
      let assignedCounselorEmail = "";

      const countryQuery = query(collection(db, "countries"), where("name", "==", formData.preferredCountry));
      const countrySnap = await getDocs(countryQuery);
      
      if (!countrySnap.empty) {
        const countryData = countrySnap.docs[0].data();
        if (countryData.assignedCounselorEmail) {
          assignedCounselor = countryData.assignedCounselorName || "Assigned Expert";
          assignedCounselorEmail = countryData.assignedCounselorEmail;
        }
      }

      const payload = {
        ...formData,
        name: formData.fullName, 
        initials: formData.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase(),
        phone: formData.whatsapp, 
        program: formData.programLevel,
        targetCountries: [formData.preferredCountry],
        notes: formData.additionalNote,
        source: "Website Consultation",
        sourceIcon: "🌐",
        stage: "NEW_LEAD",
        stageDot: "bg-blue-400",
        priority: score >= 70 ? "HIGH" : "MEDIUM",
        priorityColor: score >= 70 ? "text-error bg-error/10" : "text-primary bg-primary/10",
        leadScore: score,
        leadTemperature: temperature,
        lastContact: "New Inquiry",
        via: formData.preferredCountry,
        counselor: assignedCounselor,
        counselorEmail: assignedCounselorEmail,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "leads"), payload);
      
      toast.success("Assessment Complete! Redirecting to WhatsApp...");

      // Facebook Pixel Lead Tracking
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }

      // WhatsApp Bridge
      let message = `Hi TGE Team, I just completed the Study Abroad Eligibility Check on your website.\n\n`;
      message += `Eligibility Score: ${score}/100\n`;
      message += `Name: ${formData.fullName}\n`;
      message += `Degree: ${formData.programLevel}\n`;
      message += `Country: ${formData.preferredCountry}\n`;
      message += `Budget: ${formData.budgetRange}\n`;
      message += `IELTS: ${formData.englishProficiency}\n`;
      message += `Passport: ${formData.passportStatus}\n`;
      message += `Timeline: ${formData.startTimeline}\n`;
      
      if (formData.additionalNote.trim()) {
        message += `\nAdditional Question/Note:\n${formData.additionalNote}\n`;
      }
      
      message += `\nPlease guide me on the next steps.`;

      const encodedMessage = encodeURIComponent(message);
      const targetPhone = formData.preferredCountry === "Malaysia" ? "8801335115768" : "8801335115769";
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
      
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1500);

    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-[10px] tracking-widest uppercase mb-6 animate-fade-in">
            <Check className="w-3 h-3 mr-2" />
            Eligibility Assessment v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter mb-6 leading-[0.95]">
            Can You Study Abroad <br />
            <span className="text-secondary italic">Within Your Budget?</span>
          </h1>
          <p className="text-base text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed">
            Answer a few questions to unlock your personalized study abroad roadmap. 
            Takes less than <span className="text-primary font-bold">45 seconds</span>.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Assessment Funnel */}
          <section className="lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-ambient border border-outline-variant/30 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 flex-1 relative">
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${
                     step >= s.id ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-110" : "bg-surface-container-high text-on-surface-variant/40"
                   }`}>
                     <s.icon className="w-5 h-5" />
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
                     step >= s.id ? "text-secondary" : "text-on-surface-variant/30"
                   }`}>{s.title}</span>
                   {s.id < 4 && (
                     <div className="absolute left-1/2 w-full h-[2px] bg-outline-variant/20 top-5 -z-0">
                        <div className={`h-full bg-secondary transition-all duration-700`} style={{ width: step > s.id ? '100%' : '0%' }}></div>
                     </div>
                   )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 min-h-[400px]">
              {/* Step 1: Identity */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-primary tracking-tight">Let's start with the basics</h2>
                    <p className="text-sm text-on-surface-variant">Your contact details are used only to send your eligibility report.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Full Legal Name</label>
                      <input 
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">WhatsApp Number</label>
                      <input 
                        required
                        type="tel"
                        value={formData.whatsapp}
                        onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                        placeholder="+880 1XXX-XXXXXX" 
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Email Address (Optional)</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">City / District</label>
                      <input 
                        required
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        placeholder="Dhaka" 
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Interest */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-primary tracking-tight">Where do you want to go?</h2>
                    <p className="text-sm text-on-surface-variant">Select your preferred destination and study level.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Preferred Country</label>
                       <select 
                         value={formData.preferredCountry}
                         onChange={e => setFormData({...formData, preferredCountry: e.target.value})}
                         className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-secondary/10 transition-all"
                       >
                         {countries.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Program Level</label>
                       <select 
                         value={formData.programLevel}
                         onChange={e => setFormData({...formData, programLevel: e.target.value})}
                         className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-secondary/10 transition-all"
                       >
                         {levels.map(l => <option key={l} value={l}>{l}</option>)}
                       </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Select Your Intake Preference</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       {intakes.map(i => (
                         <button 
                           key={i} 
                           type="button"
                           onClick={() => setFormData({...formData, preferredIntake: i})}
                           className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all border-2 ${
                             formData.preferredIntake === i ? "bg-secondary text-white border-secondary shadow-lg" : "bg-surface-container-low text-primary border-transparent hover:border-outline-variant"
                           }`}
                         >
                           {i}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Eligibility */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-primary tracking-tight">The "Lead Intelligence" Quiz</h2>
                    <p className="text-sm text-on-surface-variant">We need these to calculate your visa success probability.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-secondary uppercase tracking-widest">IELTS / English Status</label>
                        <div className="space-y-2">
                           {englishProficiency.map(p => (
                             <button
                               key={p} type="button"
                               onClick={() => setFormData({...formData, englishProficiency: p})}
                               className={`w-full flex items-center justify-between p-4 rounded-2xl text-xs font-bold transition-all border-2 ${
                                 formData.englishProficiency === p ? "bg-surface-container-highest border-secondary text-primary" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                               }`}
                             >
                               {p}
                               {formData.englishProficiency === p && <Check className="w-4 h-4 text-secondary" />}
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Approximate Budget (BDT)</label>
                        <div className="space-y-2">
                           {budgetRanges.map(b => (
                             <button
                               key={b} type="button"
                               onClick={() => setFormData({...formData, budgetRange: b})}
                               className={`w-full flex items-center justify-between p-4 rounded-2xl text-xs font-bold transition-all border-2 ${
                                 formData.budgetRange === b ? "bg-surface-container-highest border-secondary text-primary" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                               }`}
                             >
                               {b}
                               {formData.budgetRange === b && <Check className="w-4 h-4 text-secondary" />}
                             </button>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Passport Status</label>
                     <div className="grid grid-cols-3 gap-3">
                        {passportStatuses.map(p => (
                          <button
                            key={p} type="button"
                            onClick={() => setFormData({...formData, passportStatus: p})}
                            className={`p-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                              formData.passportStatus === p ? "bg-secondary text-white border-secondary" : "bg-surface-container-low border-transparent"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                     </div>
                  </div>
                </div>
              )}

              {/* Step 4: Finalize */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 text-center">
                  <div className="space-y-2 max-w-lg mx-auto">
                    <h2 className="text-3xl font-black text-primary tracking-tighter">Ready to see your results?</h2>
                    <p className="text-sm text-on-surface-variant font-medium">One final question and we'll reveal your study abroad potential.</p>
                  </div>
                  
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-3 text-left">
                       <label className="text-[10px] font-black text-secondary uppercase tracking-widest block text-center">When do you want to start?</label>
                       <div className="grid grid-cols-2 gap-3">
                          {timelines.map(t => (
                            <button
                              key={t} type="button"
                              onClick={() => setFormData({...formData, startTimeline: t})}
                              className={`p-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                                formData.startTimeline === t ? "bg-secondary text-white border-secondary" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                       </div>
                    </div>
                    
                    <textarea 
                      value={formData.additionalNote}
                      onChange={e => setFormData({...formData, additionalNote: e.target.value})}
                      placeholder="Any specific questions for our team? (Optional)"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-[1.5rem] px-5 py-4 text-sm font-medium h-32 focus:ring-4 focus:ring-secondary/10 transition-all outline-none resize-none"
                    />

                    <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                       <input type="checkbox" required className="w-5 h-5 rounded-lg border-outline-variant text-secondary focus:ring-secondary cursor-pointer" />
                       <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider text-left leading-tight">
                         I agree to receive personalized counseling reports via <span className="text-secondary">WhatsApp</span> and Email.
                       </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-12 border-t border-outline-variant/10 flex items-center justify-between mt-auto">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 group text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Previous Step
                  </button>
                ) : <div />}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-cta-orange text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-cta-orange/20 hover:shadow-cta-orange/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Syncing Report...
                    </>
                  ) : (
                    <>
                      {step === 4 ? "Get Eligibility Score" : "Next Milestone"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Psychology Layer & Social Proof */}
          <aside className="lg:col-span-4 space-y-8">
            {/* The Value Prop */}
            <div className="p-8 rounded-[2rem] bg-primary text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight leading-tight">Why check your eligibility first?</h3>
                 <div className="space-y-4">
                    {[
                      "Reduce visa rejection risk",
                      "Save 20+ hours of research",
                      "Get matched with funded seats",
                      "Instant WhatsApp connection"
                    ].map(t => (
                      <div key={t} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide opacity-80">
                         <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                         {t}
                      </div>
                    ))}
                 </div>
               </div>
               <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-20" />
            </div>

            {/* Testimonial */}
            <div className="p-8 rounded-[2rem] bg-white border border-outline-variant/30 shadow-ambient flex flex-col gap-6">
                <p className="text-sm font-medium italic text-on-surface-variant leading-relaxed">
                  "The eligibility check was a game-changer. I realized I was eligible for Hungary with a lower budget than I thought!"
                </p>
                <div className="flex items-center gap-4 border-t pt-6 border-outline-variant/10">
                   <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-black text-secondary text-xs">AH</div>
                   <div>
                      <p className="text-xs font-black text-primary">Ahsan Habib</p>
                      <p className="text-[10px] font-bold text-on-surface-variant">MSc Data Science, UK</p>
                   </div>
                </div>
            </div>

            {/* Scarcity Trigger */}
            <div className="p-6 rounded-[2rem] bg-cta-orange/5 border border-cta-orange/20 text-center space-y-3">
               <p className="text-[10px] font-black uppercase tracking-widest text-cta-orange">Next Intake Deadline</p>
               <h4 className="text-2xl font-black text-primary tracking-tighter">Sept 2025 Sessions</h4>
               <p className="text-[10px] font-semibold text-on-surface-variant italic">Limited spots left for curated counseling.</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationPage;
