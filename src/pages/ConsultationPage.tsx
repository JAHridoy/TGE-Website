import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";
import { Check, Loader2, Award, Users, Clock, ArrowRight, ArrowLeft, Search, MapPin, Sparkles, Building2, TrendingUp } from "lucide-react";

/**
 * 64 Districts of Bangladesh
 */
const BD_DISTRICTS = [
  "Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
  "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira",
  "Jamalpur", "Mymensingh", "Netrokona", "Sherpur",
  "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajganj",
  "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
  "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"
].sort();

const ConsultationPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResultsView, setIsResultsView] = useState(false);
  const [leadScore, setLeadScore] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    city: "",
    preferredCountry: "Australia",
    programLevel: "Bachelors",
    preferredIntake: "Within 6 months",
    englishProficiency: "",
    englishScore: "",
    noEnglishStatus: "",
    budgetRange: "8-12 lakh",
    bankReadiness: "",
    bankType: "",
    bankDuration: "",
    passportStatus: "Ready",
    startTimeline: "Within 3 months",
    additionalNote: "",
    sscResult: "",
    sscYear: "",
    hscResult: "",
    hscYear: "",
    bachelorResult: "",
    bachelorYear: "",
  });

  // City Search State
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom Year Dropdown State
  const [openYearDropdown, setOpenYearDropdown] = useState<string | null>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const filteredDistricts = useMemo(() => {
    return BD_DISTRICTS.filter(d =>
      d.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setOpenYearDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const steps = [
    { id: 1, title: "Interest", icon: Award },
    { id: 2, title: "Eligibility", icon: Check },
    { id: 3, title: "Identity", icon: Users },
  ];

  const levels = ["Foundation", "Diploma", "Bachelors", "Masters"];
  const countries = ["Australia", "United Kingdom", "Canada", "Hungary", "Malta", "Malaysia", "Lithuania", "Cyprus"];
  const intakes = ["MAY/JUN", "SEP/OCT", "NOV/DEC", "JAN/FEB 2027"];
  const englishProficiencies = ["NOT AVAILABLE", "IELTS", "PTE", "TOEFL", "MOI", "OTHER"];
  const budgetRanges = ["Below 5 lakh", "5-8 lakh", "8-12 lakh", "12 lakh+"];
  const passportStatuses = ["Ready", "Applied", "Not ready"];

  const currentYear = new Date().getFullYear();
  const passingYears = Array.from({ length: 30 }, (_, i) => currentYear - i);

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
    if (formData.englishProficiency && formData.englishProficiency !== "NOT AVAILABLE") score += 25;
    else if (formData.noEnglishStatus === "TAKING PREPARATION" || formData.noEnglishStatus === "PLANNING TO TAKE") score += 15;
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

  /**
   * Phone Normalization: Convert 017... to +88017...
   */
  const normalizePhoneNumber = (phone: string) => {
    const cleaned = phone.trim().replace(/[\s-]/g, '');
    if (cleaned.startsWith('01')) return '+88' + cleaned;
    if (cleaned.startsWith('8801')) return '+' + cleaned;
    return cleaned;
  };

  /**
   * Phone Validation for Bangladesh Format
   */
  const isValidBDPhone = (phone: string) => {
    const normalized = normalizePhoneNumber(phone);
    return /^\+8801[3-9]\d{8}$/.test(normalized);
  };

  const buildWhatsAppMessage = () => {
    let message = `Hi TGE Team, I just completed my study abroad eligibility check on your website.\n\n`;
    message += `📋 ASSESSMENT RESULTS:\n`;
    message += `- Name: ${formData.fullName}\n`;
    if (formData.city) message += `- From: ${formData.city}\n`;
    message += `- Target: ${formData.preferredCountry} (${formData.programLevel})\n`;
    message += `- Intake: ${formData.preferredIntake}\n`;
    message += `- Budget: ${formData.budgetRange}\n`;

    if (formData.englishProficiency) {
      if (formData.englishProficiency === "NOT AVAILABLE") {
        message += `- English: NO (${formData.noEnglishStatus})\n`;
      } else if (formData.englishProficiency === "MOI") {
        message += `- English: MOI (Medium of Instruction)\n`;
      } else {
        message += `- English: ${formData.englishProficiency} (Score: ${formData.englishScore})\n`;
      }
    }

    message += `\n🎓 ACADEMICS:\n`;
    if (formData.sscResult) message += `- SSC: ${formData.sscResult} (${formData.sscYear})\n`;
    if (formData.hscResult) message += `- HSC: ${formData.hscResult} (${formData.hscYear})\n`;
    if (formData.bachelorResult) message += `- Bachelor: ${formData.bachelorResult} (${formData.bachelorYear})\n`;

    message += `\n🛡️ READINESS:\n`;
    if (formData.bankReadiness) {
      if (formData.bankReadiness === "READY") {
        message += `- Bank Status: READY (${formData.bankType}, ${formData.bankDuration} Months)\n`;
      } else {
        message += `- Bank Status: NOT READY\n`;
      }
    }
    message += `- Passport: ${formData.passportStatus}\n`;

    if (formData.additionalNote) {
      message += `\n📝 NOTE: ${formData.additionalNote}\n`;
    }

    message += `\n`;
    message += `Please guide me on the next steps for my enrollment.`;
    return message;
  };

  const getTargetPhone = () => {
    return formData.preferredCountry === "Malaysia" ? "8801335115768" : "8801335115769";
  };

  // Deep link: opens native WhatsApp app, keeps browser on results screen
  const triggerWhatsAppDeepLink = () => {
    const encodedMessage = encodeURIComponent(buildWhatsAppMessage());
    window.location.href = `whatsapp://send?phone=${getTargetPhone()}&text=${encodedMessage}`;
  };

  // Web fallback: for desktop users clicking the results screen button
  const handleWhatsAppRedirect = () => {
    const encodedMessage = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${getTargetPhone()}?text=${encodedMessage}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (step === 1) {
        if (!formData.sscResult || !formData.sscYear) {
          toast.error("Please enter your SSC result and passing year.");
          window.scrollTo({ top: 400, behavior: 'smooth' });
          return;
        }
        if (formData.programLevel !== "Foundation" && formData.programLevel !== "Diploma") {
          if (!formData.hscResult || !formData.hscYear) {
            toast.error(`Please enter your HSC result and passing year for ${formData.programLevel} program.`);
            window.scrollTo({ top: 400, behavior: 'smooth' });
            return;
          }
        }
        if (formData.programLevel === "Masters") {
          if (!formData.bachelorResult || !formData.bachelorYear) {
            toast.error("Please enter your Bachelor result and passing year for Masters program.");
            window.scrollTo({ top: 400, behavior: 'smooth' });
            return;
          }
        }
      }

      if (step === 2) {
        if (!formData.bankReadiness) {
          toast.error("Please select your Bank Readiness status.");
          return;
        }
        if (formData.bankReadiness === "READY" && !formData.bankType) {
          toast.error("Please specify your Bank Account Type.");
          window.scrollTo({ top: 400, behavior: 'smooth' });
          return;
        }
        if (formData.bankReadiness === "READY" && formData.bankType && !formData.bankDuration) {
          toast.error("Please specify your Bank Account Duration.");
          window.scrollTo({ top: 400, behavior: 'smooth' });
          return;
        }

        if (!formData.englishProficiency) {
          toast.error("Please select an English Proficiency option.");
          return;
        }
        if (formData.englishProficiency && !["NOT AVAILABLE", "MOI"].includes(formData.englishProficiency) && !formData.englishScore) {
          toast.error("Please enter your English Score.");
          window.scrollTo({ top: 300, behavior: 'smooth' });
          return;
        }
        if (formData.englishProficiency === "NOT AVAILABLE" && !formData.noEnglishStatus) {
          toast.error("Please specify your plans if English Proficiency is not available.");
          window.scrollTo({ top: 300, behavior: 'smooth' });
          return;
        }
      }

      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    // Step 3 Validation: Phone format
    if (!isValidBDPhone(formData.whatsapp)) {
      toast.error("Please enter a valid Bangladesh WhatsApp number (01XXXXXXXXX)");
      return;
    }

    setIsSubmitting(true);
    const score = calculateLeadScore();
    setLeadScore(score);
    const temperature = score >= 70 ? "Hot" : score >= 40 ? "Warm" : "Cold";
    const normalizedPhone = normalizePhoneNumber(formData.whatsapp);

    try {
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
        // Identity
        name: formData.fullName,
        fullName: formData.fullName,
        initials: formData.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase(),
        phone: normalizedPhone,
        whatsapp: normalizedPhone,
        email: formData.email,
        city: formData.city,

        // Academic Records
        sscResult: formData.sscResult,
        sscYear: formData.sscYear,
        hscResult: formData.hscResult,
        hscYear: formData.hscYear,
        bachelorResult: formData.bachelorResult,
        bachelorYear: formData.bachelorYear,

        // Study Abroad Preferences
        preferredCountry: formData.preferredCountry,
        targetCountries: [formData.preferredCountry],
        programLevel: formData.programLevel,
        program: formData.programLevel,
        preferredIntake: formData.preferredIntake,
        budgetRange: formData.budgetRange,

        // Eligibility & Readiness
        englishProficiency: formData.englishProficiency,
        englishScore: formData.englishScore,
        noEnglishStatus: formData.noEnglishStatus,
        bankReadiness: formData.bankReadiness,
        bankType: formData.bankType,
        bankDuration: formData.bankDuration,
        passportStatus: formData.passportStatus,

        // Intent & Notes
        startTimeline: formData.startTimeline,
        additionalNote: formData.additionalNote,
        notes: formData.additionalNote,

        // CRM Metadata
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

      toast.success("Lead sync complete! Show results view.");

      // Facebook Pixel Lead Tracking
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }

      // Show results preview
      setIsResultsView(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      setIsSubmitting(false);

      // Open WhatsApp app via deep link (mobile: opens app, desktop: silent fail)
      setTimeout(() => triggerWhatsAppDeepLink(), 500);

    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return "Generating Report...";
    if (step === 1) return "Check My Eligibility";
    if (step === 2) return "See My Best Options";
    return "Get My Study Plan";
  };

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main className="pt-28 pb-20 px-4 md:px-12 w-full max-w-6xl mx-auto overflow-x-hidden">
        {/* Header Section */}
        {!isResultsView && (
          <header className="mb-6 lg:mb-10 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter mb-3 leading-[0.95]">
              Find the Best Country You Can Afford <br />
              <span className="text-secondary italic">In 45 Seconds</span>
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant font-medium max-w-2xl mx-auto leading-snug">
              Answer a few quick questions and get a clear study abroad plan based on your budget and profile.
            </p>
          </header>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Assessment Funnel */}
          <section className="lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-ambient border border-outline-variant/30 relative overflow-hidden transition-all duration-500">

            {/* Reward Preview Block */}
            {!isResultsView && step === 1 && (
              <div className="mb-8 p-5 bg-primary/5 border border-primary/10 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-2 gap-y-3 gap-x-3">
                  <h4 className="col-span-2 text-[10px] font-bold uppercase text-secondary tracking-widest mb-1">You’ll get in 45 seconds:</h4>
                  {[
                    "Best Country Options",
                    "Visa Success Chances",
                    "Estimated Cost Breakdown",
                    "Next Available Intake"
                  ].map((label, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3 h-3" />
                      </div>
                      <p className="text-xs font-bold text-primary leading-none">{label}</p>
                    </div>
                  ))}
                </div>
                <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-primary opacity-[0.03] rotate-12" />
              </div>
            )}

            {isResultsView ? (
              /* RESULTS PREVIEW UI */
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto shadow-xl shadow-secondary/20 mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary tracking-tighter">Your Intelligence Report is Ready!</h2>
                  <p className="text-base font-medium text-on-surface-variant max-w-sm mx-auto">Based on your inputs, we've calculated your best study abroad path.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Recommended", value: formData.preferredCountry, icon: Building2, color: "bg-blue-50 text-blue-600" },
                    { label: "Budget Fit", value: leadScore >= 60 ? "Excellent" : leadScore >= 40 ? "Good" : "Explore More", icon: Check, color: "bg-green-50 text-green-600" },
                    { label: "Visa Chance", value: leadScore >= 70 ? "High" : leadScore >= 50 ? "Moderate" : "Consult Expert", icon: TrendingUp, color: "bg-orange-50 text-orange-600" }
                  ].map((card, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                        <card.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 mb-1">{card.label}</p>
                        <p className="text-base font-bold text-primary">{card.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-[2rem] bg-secondary text-white shadow-2xl space-y-6 relative overflow-hidden text-center">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Ready to secure your seat?</h3>
                    <p className="opacity-90 text-sm font-medium mb-8">Click below to continue to WhatsApp and get your full breakdown within minutes.</p>

                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full bg-white text-secondary py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.1em] shadow-xl hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-3"
                    >
                      Continue to WhatsApp
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-12">
                  {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 flex-1 relative">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${step >= s.id ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-110" : "bg-surface-container-high text-on-surface-variant/40"
                        }`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${step >= s.id ? "text-secondary" : "text-on-surface-variant/30"
                        }`}>{s.title}</span>
                      {s.id < 3 && (
                        <div className="absolute left-1/2 w-full h-[2px] bg-outline-variant/20 top-5 -z-0">
                          <div className={`h-full bg-secondary transition-all duration-700`} style={{ width: step > s.id ? '100%' : '0%' }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 min-h-[400px]">
                  {/* Step 1: Interest */}
                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 1 of 3 — Takes 45 seconds</h2>
                        <p className="text-sm text-on-surface-variant font-medium">Where do you want to go and what is your study level?</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs md:text-sm font-bold text-primary mb-1.5 block truncate">Preferred Country</label>
                          <select
                            value={formData.preferredCountry}
                            onChange={e => setFormData({ ...formData, preferredCountry: e.target.value })}
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-3 py-3 md:px-5 md:py-4 text-[13px] md:text-sm font-semibold appearance-none outline-none focus:ring-4 focus:ring-secondary/10 transition-all cursor-pointer"
                          >
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs md:text-sm font-bold text-primary mb-1.5 block truncate">Program Level</label>
                          <select
                            value={formData.programLevel}
                            onChange={e => setFormData({ ...formData, programLevel: e.target.value })}
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-3 py-3 md:px-5 md:py-4 text-[13px] md:text-sm font-semibold appearance-none outline-none focus:ring-4 focus:ring-secondary/10 transition-all cursor-pointer"
                          >
                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-primary mb-1.5 block">Preferred Intake</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {intakes.map(i => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredIntake: i })}
                              className={`p-4 rounded-2xl text-[11px] font-bold uppercase tracking-tight transition-all border-2 ${formData.preferredIntake === i ? "bg-secondary text-white border-secondary shadow-lg" : "bg-surface-container-low text-primary border-transparent hover:border-outline-variant"
                                }`}
                            >
                              {i}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-outline-variant/10" ref={yearDropdownRef}>
                        <label className="text-sm font-bold text-primary mb-1.5 block">Academic Results</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">SSC Result <span className="text-error">*</span></label>
                             <input type="text" placeholder="GPA 5.00" value={formData.sscResult} onChange={e => setFormData({ ...formData, sscResult: e.target.value })} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 outline-none" />
                          </div>
                          <div className="space-y-2 relative">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">Passing Year <span className="text-error">*</span></label>
                             <div onClick={() => setOpenYearDropdown(openYearDropdown === "ssc" ? null : "ssc")} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer flex justify-between items-center text-primary">
                               <span className={formData.sscYear ? "text-primary" : "text-on-surface-variant/50"}>{formData.sscYear || "Select Year"}</span>
                             </div>
                             {openYearDropdown === "ssc" && (
                               <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                                 {passingYears.map(y => (
                                   <div key={y} onClick={() => { setFormData({...formData, sscYear: String(y)}); setOpenYearDropdown(null); }} className={`px-3 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${formData.sscYear === String(y) ? "bg-secondary text-white" : "hover:bg-secondary/5 text-on-surface-variant"}`}>
                                     {y}
                                   </div>
                                 ))}
                               </div>
                             )}
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">HSC Result {(formData.programLevel !== "Foundation" && formData.programLevel !== "Diploma") && <span className="text-error">*</span>}</label>
                             <input type="text" placeholder="GPA 5.00" value={formData.hscResult} onChange={e => setFormData({ ...formData, hscResult: e.target.value })} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 outline-none" />
                          </div>
                          <div className="space-y-2 relative">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">Passing Year {(formData.programLevel !== "Foundation" && formData.programLevel !== "Diploma") && <span className="text-error">*</span>}</label>
                             <div onClick={() => setOpenYearDropdown(openYearDropdown === "hsc" ? null : "hsc")} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer flex justify-between items-center text-primary">
                               <span className={formData.hscYear ? "text-primary" : "text-on-surface-variant/50"}>{formData.hscYear || "Select Year"}</span>
                             </div>
                             {openYearDropdown === "hsc" && (
                               <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                                 {passingYears.map(y => (
                                   <div key={y} onClick={() => { setFormData({...formData, hscYear: String(y)}); setOpenYearDropdown(null); }} className={`px-3 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${formData.hscYear === String(y) ? "bg-secondary text-white" : "hover:bg-secondary/5 text-on-surface-variant"}`}>
                                     {y}
                                   </div>
                                 ))}
                               </div>
                             )}
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">Bachelor Result {formData.programLevel === "Masters" && <span className="text-error">*</span>}</label>
                             <input type="text" placeholder="CGPA 3.50" value={formData.bachelorResult} onChange={e => setFormData({ ...formData, bachelorResult: e.target.value })} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 outline-none" />
                          </div>
                          <div className="space-y-2 relative">
                             <label className="text-[10px] font-bold text-on-surface-variant uppercase">Passing Year {formData.programLevel === "Masters" && <span className="text-error">*</span>}</label>
                             <div onClick={() => setOpenYearDropdown(openYearDropdown === "bachelor" ? null : "bachelor")} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer flex justify-between items-center text-primary">
                               <span className={formData.bachelorYear ? "text-primary" : "text-on-surface-variant/50"}>{formData.bachelorYear || "Select Year"}</span>
                             </div>
                             {openYearDropdown === "bachelor" && (
                               <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                                 {passingYears.map(y => (
                                   <div key={y} onClick={() => { setFormData({...formData, bachelorYear: String(y)}); setOpenYearDropdown(null); }} className={`px-3 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${formData.bachelorYear === String(y) ? "bg-secondary text-white" : "hover:bg-secondary/5 text-on-surface-variant"}`}>
                                     {y}
                                   </div>
                                 ))}
                               </div>
                             )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Eligibility */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 2 of 3 — Eligibility Assessment</h2>
                        <p className="text-sm text-on-surface-variant font-medium">We need these to calculate your visa success probability.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">English Proficiency</label>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {englishProficiencies.map(p => (
                              <button
                                key={p} type="button"
                                onClick={() => setFormData({
                                  ...formData,
                                  englishProficiency: p,
                                  englishScore: ["NOT AVAILABLE", "MOI"].includes(p) ? "" : formData.englishScore,
                                  noEnglishStatus: p !== "NOT AVAILABLE" ? "" : formData.noEnglishStatus
                                })}
                                className={`w-full h-14 md:h-16 px-2 rounded-2xl text-[11px] md:text-xs font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.englishProficiency === p ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                  }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>

                          {/* Conditional Score Inputs */}
                          {(formData.englishProficiency && !["NOT AVAILABLE", "MOI"].includes(formData.englishProficiency)) && (
                            <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                              <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">
                                {formData.englishProficiency === "OTHER" ? "Specify Test & Score" : "English Score"}
                              </label>
                              <input
                                type="text"
                                value={formData.englishScore}
                                onChange={e => setFormData({ ...formData, englishScore: e.target.value })}
                                placeholder={
                                  formData.englishProficiency === "IELTS" ? "e.g. 6.5" :
                                  formData.englishProficiency === "PTE" ? "e.g. 58" :
                                  formData.englishProficiency === "TOEFL" ? "e.g. 90" :
                                  formData.englishProficiency === "OTHER" ? "e.g. Duolingo 120, OIETC etc." :
                                  "e.g. 7.5"
                                }
                                className="w-full h-14 md:h-16 bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                              />
                            </div>
                          )}

                          {/* Conditional No English Status */}
                          {(formData.englishProficiency === "NOT AVAILABLE") && (
                            <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                              <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">
                                If No English Proficiency
                              </label>
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                {["WILL NOT ATTEMPT", "PLANNING TO TAKE", "TAKING PREPARATION"].map(status => (
                                  <button
                                    key={status} type="button"
                                    onClick={() => setFormData({ ...formData, noEnglishStatus: status })}
                                    className={`w-full h-14 md:h-16 px-2 rounded-2xl text-[10px] md:text-[11px] font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.noEnglishStatus === status ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                      }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">Approximate Budget (BDT)</label>
                          <div className="space-y-3">
                            {budgetRanges.map(b => (
                              <button
                                key={b} type="button"
                                onClick={() => setFormData({ ...formData, budgetRange: b })}
                                className={`w-full h-14 md:h-16 flex items-center justify-between px-5 rounded-2xl text-sm font-semibold transition-all border-2 tracking-wide ${formData.budgetRange === b ? "bg-surface-container-highest border-secondary text-primary shadow-sm" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                  }`}
                              >
                                {b}
                                {formData.budgetRange === b && <Check className="w-4 h-4 text-secondary" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">Bank Readiness</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["READY", "NOT READY"].map(status => (
                              <button
                                key={status} type="button"
                                onClick={() => setFormData({ ...formData, bankReadiness: status, bankType: status === "NOT READY" ? "" : formData.bankType, bankDuration: status === "NOT READY" ? "" : formData.bankDuration })}
                                className={`w-full h-14 md:h-16 px-2 rounded-2xl text-[11px] md:text-xs font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.bankReadiness === status ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                  }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>

                          {(formData.bankReadiness === "READY") && (
                            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="space-y-2">
                                <label className="text-[10px] md:text-[11px] uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                  {["FDR", "SAVINGS"].map(type => (
                                    <button
                                      key={type} type="button"
                                      onClick={() => setFormData({ ...formData, bankType: type })}
                                      className={`w-full h-12 md:h-14 px-2 rounded-2xl text-[11px] md:text-xs font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.bankType === type ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                        }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {formData.bankType && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <label className="text-[10px] md:text-[11px] uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">Duration</label>
                                  <div className="flex items-center gap-2 md:gap-3">
                                    <div className="grid grid-cols-4 gap-2 flex-grow">
                                      {["3+", "6+", "9+", "12+"].map(dur => (
                                        <button
                                          key={dur} type="button"
                                          onClick={() => setFormData({ ...formData, bankDuration: dur })}
                                          className={`w-full h-12 md:h-14 px-1 md:px-3 rounded-2xl text-[11px] md:text-xs font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.bankDuration === dur ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                            }`}
                                        >
                                          {dur}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="text-[10px] md:text-[11px] font-bold text-on-surface-variant uppercase pt-1">MONTHS</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <label className="text-[12px] md:text-sm uppercase font-bold text-primary mb-2 block tracking-widest text-on-surface-variant/80">Passport Status</label>
                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            {passportStatuses.map(p => (
                              <button
                                key={p} type="button"
                                onClick={() => setFormData({ ...formData, passportStatus: p })}
                                className={`w-full h-14 md:h-16 px-1 md:px-2 rounded-2xl text-[10px] md:text-[11px] lg:text-xs font-bold uppercase transition-all border-2 flex items-center justify-center text-center leading-tight tracking-wide ${formData.passportStatus === p ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                  }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Identity */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">You're one step away from your study abroad plan</h2>
                        <p className="text-sm text-on-surface-variant font-medium">Our counselor is ready to guide you based on your answers.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-primary mb-1.5 block">Full Legal Name</label>
                          <input
                            required
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            autoComplete="name"
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-primary mb-1.5 block">Current WhatsApp number</label>
                          <input
                            required
                            type="tel"
                            value={formData.whatsapp}
                            onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="01XXXXXXXXX"
                            autoComplete="tel"
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                          />
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1 italic">we’ll guide you here within minutes</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-primary mb-1.5 block">Email Address (Optional)</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            autoComplete="email"
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                          />
                        </div>

                        {/* Searchable City Dropdown */}
                        <div className="space-y-2 relative" ref={dropdownRef}>
                          <label className="text-sm font-bold text-primary mb-1.5 block">Current City / District</label>
                          <div
                            onClick={() => setIsCityOpen(!isCityOpen)}
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 text-sm font-semibold cursor-pointer flex justify-between items-center"
                          >
                            <span className={formData.city ? "text-primary" : "text-on-surface-variant/40"}>
                              {formData.city || "Select City"}
                            </span>
                            <MapPin className="w-4 h-4 text-secondary/50" />
                          </div>
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1 italic text-right">helps us assign a counselor near you</p>

                          {isCityOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-surface-container-lowest border border-outline-variant/50 rounded-2xl shadow-2xl z-[100] p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                              <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                                <input
                                  autoFocus
                                  value={citySearch}
                                  onChange={e => setCitySearch(e.target.value)}
                                  placeholder="Search district..."
                                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-10 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-secondary/20"
                                />
                              </div>
                              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                                {filteredDistricts.length > 0 ? (
                                  filteredDistricts.map(city => (
                                    <div
                                      key={city}
                                      onClick={() => {
                                        setFormData({ ...formData, city });
                                        setIsCityOpen(false);
                                        setCitySearch("");
                                      }}
                                      className={`px-4 py-3 rounded-xl text-xs font-bold cursor-pointer transition-colors ${formData.city === city ? "bg-secondary text-white" : "hover:bg-secondary/5 text-on-surface-variant"
                                        }`}
                                    >
                                      {city}
                                    </div>
                                  ))
                                ) : (
                                  <div
                                    onClick={() => {
                                      setFormData({ ...formData, city: citySearch });
                                      setIsCityOpen(false);
                                    }}
                                    className="px-4 py-3 text-xs font-bold text-secondary cursor-pointer italic"
                                  >
                                    Not found? Use "{citySearch}"
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-8 max-w-lg mx-auto">
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-primary mb-1.5 block text-center">When do you want to start your journey?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Immediately", "This month", "In 2-3 months", "Just researching"].map(t => (
                              <button
                                key={t} type="button"
                                onClick={() => setFormData({ ...formData, startTimeline: t })}
                                className={`p-4 rounded-2xl text-xs font-bold uppercase transition-all border-2 ${formData.startTimeline === t ? "bg-secondary text-white border-secondary shadow-md" : "bg-surface-container-low border-transparent text-on-surface-variant hover:border-outline-variant"
                                  }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-primary mb-1.5 block">Additional Questions (Optional)</label>
                          <textarea
                            value={formData.additionalNote}
                            onChange={e => setFormData({ ...formData, additionalNote: e.target.value })}
                            placeholder="Tell us about your specific goals or concerns..."
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-[1.5rem] px-5 py-4 text-sm font-medium h-32 focus:ring-4 focus:ring-secondary/10 transition-all outline-none resize-none"
                          />
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-secondary/5 rounded-2xl border border-secondary/10">
                          <input type="checkbox" required className="w-5 h-5 rounded-lg border-outline-variant text-secondary focus:ring-secondary cursor-pointer flex-shrink-0" />
                          <p className="text-[11px] text-on-surface-variant font-semibold tracking-wide text-left leading-tight">
                            I agree to receive personalized counseling reports via <span className="text-secondary font-bold">WhatsApp</span> and Email from TGE Team.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Actions */}
                  <div className="pt-8 border-t border-outline-variant/10 flex flex-col items-center gap-8">
                    <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full gap-5 md:gap-0">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="flex items-center gap-2 group text-on-surface-variant font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                          Previous Step
                        </button>
                      ) : <div className="hidden md:block" />}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-cta-orange text-white rounded-[2rem] font-bold uppercase tracking-widest shadow-2xl shadow-cta-orange/20 hover:shadow-cta-orange/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-center max-w-[90vw] ${step === 1 ? 'px-10 py-5 text-sm' : 'px-8 py-4 text-xs'}`}
                      >
                        {getButtonText()}
                        {!isSubmitting && <ArrowRight className={step === 1 ? "w-5 h-5 flex-shrink-0" : "w-4 h-4 flex-shrink-0"} />}
                      </button>
                    </div>

                    {/* Trust Signals & Urgency */}
                    <div className="w-full space-y-6">
                      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Trusted by students</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> No hidden charges</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Expert guidance</span>
                      </div>
                      <div className="text-center p-4 bg-cta-orange/5 rounded-2xl border border-cta-orange/15 shadow-sm">
                        <p className="text-xs font-bold text-cta-orange">
                          🔥 Limited seats for upcoming intake — early applicants get better scholarship options
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
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