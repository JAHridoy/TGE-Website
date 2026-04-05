import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const countries = [
  {
    name: "Australia",
    tag: "TOP RATED",
    img: "/australia.png",
    slug: "australia",
    chips: ["Engineering", "Business", "Health Sciences"],
    highlights: [
      { icon: "school", text: "8 of top 100 universities globally" },
      { icon: "work", text: "2-4 year post-study work visa" },
      { icon: "payments", text: "$20k - $45k AUD per year" },
    ],
  },
  {
    name: "United Kingdom",
    tag: "POPULAR",
    img: "/uk.png",
    slug: "uk",
    chips: ["Law", "Finance", "Arts"],
    highlights: [
      { icon: "school", text: "Home to Oxford, Cambridge, Imperial" },
      { icon: "work", text: "2-year Graduate Route visa" },
      { icon: "payments", text: "£10k - £38k per year" },
    ],
  },
  {
    name: "Canada",
    tag: "HIGH DEMAND",
    img: "/canada.png",
    slug: "canada",
    chips: ["Technology", "Engineering", "Business"],
    highlights: [
      { icon: "school", text: "Globally ranked research universities" },
      { icon: "work", text: "PGWP up to 3 years" },
      { icon: "payments", text: "CAD $15k - $35k per year" },
    ],
  },
  {
    name: "Hungary",
    tag: "AFFORDABLE",
    img: "/hungary.png",
    slug: "hungary",
    chips: ["Medicine", "Engineering", "Business"],
    highlights: [
      { icon: "school", text: "EU-recognized degrees" },
      { icon: "work", text: "Schengen access" },
      { icon: "payments", text: "$5k - $12k EUR per year" },
    ],
  },
  {
    name: "Malta",
    tag: "MEDITERRANEAN HUB",
    img: "/malta.png",
    slug: "malta",
    chips: ["Business", "Tourism", "IT"],
    highlights: [
      { icon: "school", text: "EU standard education" },
      { icon: "work", text: "English speaking environment" },
      { icon: "payments", text: "Affordable living costs" },
    ],
  },
  {
    name: "Malaysia",
    tag: "ASIAN HUB",
    img: "/malaysia.png",
    slug: "malaysia",
    chips: ["Engineering", "Business", "Technology"],
    highlights: [
      { icon: "school", text: "Globally ranked branch campuses" },
      { icon: "work", text: "Vibrant multicultural society" },
      { icon: "payments", text: "Low tuition fees" },
    ],
  },
  {
    name: "Lithuania",
    tag: "CENTRAL EUROPE",
    img: "/lithuania.png",
    slug: "lithuania",
    chips: ["FinTech", "Technology", "Arts"],
    highlights: [
      { icon: "school", text: "Modern high-tech labs" },
      { icon: "work", text: "Simplified visa for graduates" },
      { icon: "payments", text: "Affordable tuition" },
    ],
  },
  {
    name: "Cyprus",
    tag: "SUNSET HUB",
    img: "/cyprus.png",
    slug: "cyprus",
    chips: ["Law", "Business", "Maritime"],
    highlights: [
      { icon: "school", text: "Gateway to EU" },
      { icon: "work", text: "Safe and welcoming" },
      { icon: "payments", text: "Multicultural environment" },
    ],
  },
];

const CountriesPage = () => {
  const [activeProgram, setActiveProgram] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tuitionRanges, setTuitionRanges] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const programs = ["Engineering", "Business", "Medicine", "Arts & Design", "Computer Science"];

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = !activeProgram || country.chips.includes(activeProgram);
      const matchesTuition = tuitionRanges.length === 0 || tuitionRanges.some(range => {
        if (range === "Budget Friendly (< $10k)") {
          return country.highlights.some(h => h.icon === "payments" && h.text.includes("$5k") || h.text.includes("Affordable"));
        }
        if (range === "Standard Academic ($10k - $25k)") {
          return country.highlights.some(h => h.icon === "payments" && h.text.includes("$20k") || h.text.includes("£10k") || h.text.includes("CAD $15k"));
        }
        if (range === "Premium Institutions (> $25k)") {
          return country.highlights.some(h => h.icon === "payments" && h.text.includes("$30k") || h.text.includes("£30k"));
        }
        return true;
      });
      return matchesSearch && matchesProgram && matchesTuition;
    });
  }, [searchQuery, activeProgram, tuitionRanges]);

  const toggleSelection = (countryName: string) => {
    setSelectedCountries(prev => 
      prev.includes(countryName) 
        ? prev.filter(n => n !== countryName) 
        : (prev.length < 3 ? [...prev, countryName] : prev)
    );
  };

  const selectedData = useMemo(() => {
    return countries.filter(c => selectedCountries.includes(c.name));
  }, [selectedCountries]);

  return (
    <div className="bg-surface">
      <Navbar />
      <main className="pt-24 pb-12">
        {/* Hero */}
        <header className="relative px-12 py-16 max-w-6xl mx-auto overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Destination Directory</span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-[1.15] mb-6">
              Choose Your Path to <span className="text-secondary">Global Excellence</span>
            </h1>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8 max-w-lg">
              Navigate our curated selection of premier study destinations, each vetted for academic rigor and career opportunities.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Explore All</button>
              <button 
                onClick={() => selectedCountries.length >= 2 && setIsModalOpen(true)}
                disabled={selectedCountries.length < 2}
                className={`bg-surface-container-high text-primary px-7 py-3 rounded-xl font-bold text-sm transition-colors ${selectedCountries.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container-highest cursor-pointer'}`}
              >
                Compare Programs {selectedCountries.length > 0 && `(${selectedCountries.length})`}
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </header>

        {/* Filters & Grid */}
        <section className="px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mt-8">
          {/* Sidebar */}
          <aside className="space-y-10">
            <div>
              <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-6 px-1">Find Destination</h3>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search country..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-secondary transition-all outline-none"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
              </div>
            </div>
            
            <div className="h-px bg-surface-container-high"></div>

            <div>
              <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-6">Tuition Range</h3>
              <div className="space-y-4">
                {["Budget Friendly (< $10k)", "Standard Academic ($10k - $25k)", "Premium Institutions (> $25k)"].map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={tuitionRanges.includes(range)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTuitionRanges([...tuitionRanges, range]);
                        } else {
                          setTuitionRanges(tuitionRanges.filter(r => r !== range));
                        }
                      }}
                      className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20" 
                    />
                    <span className="text-on-surface-variant group-hover:text-primary text-sm transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="h-px bg-surface-container-high"></div>
            <div>
              <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-6">Popular Programs</h3>
              <div className="flex flex-wrap gap-2">
                {programs.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveProgram(p)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeProgram === p
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-surface-container-lowest text-secondary border border-secondary/10 hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px bg-surface-container-high"></div>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Certified Partner</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                TGE is an ICEF-certified global education agency, ensuring adherence to the highest international standards.
              </p>
            </div>
          </aside>

          {/* Country Grid */}
          <div className="space-y-8">
            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCountries.map((country) => (
                  <article key={country.name} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_12px_40px_-5px_rgba(25,28,30,0.04)] hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full">
                    <div className="h-64 relative overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={country.img} alt={country.name} />
                      <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur px-4 py-1.5 rounded-full flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-xs font-bold text-primary">{country.tag}</span>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <label className="flex items-center gap-2 bg-white/90 backdrop-blur p-2 rounded-lg cursor-pointer hover:bg-white transition-colors border border-outline-variant/20 shadow-sm">
                          <Checkbox 
                            checked={selectedCountries.includes(country.name)}
                            onCheckedChange={() => toggleSelection(country.name)}
                          />
                          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Compare</span>
                        </label>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-3">{country.name}</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {country.chips.map((chip) => (
                            <span key={chip} className="bg-surface-container-low px-3 py-1 rounded-full text-xs font-medium text-on-surface-variant">{chip}</span>
                          ))}
                        </div>
                        <div className="space-y-3 mb-8">
                          {country.highlights.map((h) => (
                            <div key={h.text} className="flex items-center gap-3 text-sm text-on-surface-variant">
                              <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{h.icon}</span>
                              {h.text}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Link 
                          to={`/countries/${country.slug}`} 
                          className="flex-1 text-center bg-surface-container-high text-primary py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all"
                        >
                          Details
                        </Link>
                        <Link 
                          to={`/consultation?country=${encodeURIComponent(country.name)}`} 
                          className="flex-1 text-center bg-primary text-primary-foreground py-4 rounded-xl font-bold"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-2xl py-20 px-8 text-center flex flex-col items-center justify-center border border-dashed border-outline-variant/50">
                <span className="material-symbols-outlined text-outline-variant text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>travel_explore</span>
                <h3 className="text-xl font-bold text-primary mb-2">No Destinations Found</h3>
                <p className="text-on-surface-variant max-w-sm mb-8">We couldn't find any study destinations matching your current filters. Try adjusting your search or filters.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setTuitionRanges([]);
                    setActiveProgram("");
                  }}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
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
                Not Sure Which Destination to Choose?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Connect with our expert consultants for a personalized roadmap tailored to your academic and career goals.
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

        {/* Comparison Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest border-outline-variant">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary mb-4">Program Comparison</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-outline-variant/30">
                  <TableHead className="w-[200px] font-bold text-primary uppercase text-xs tracking-widest">Attributes</TableHead>
                  {selectedData.map(c => (
                    <TableHead key={c.name} className="font-bold text-primary text-center">
                      <div className="flex flex-col items-center gap-2 pb-2">
                        <span className="text-lg">{c.name}</span>
                        <button 
                          onClick={() => toggleSelection(c.name)}
                          className="text-[10px] text-secondary hover:underline uppercase font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-outline-variant/20">
                  <TableCell className="font-bold text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">school</span>
                    Top Programs
                  </TableCell>
                  {selectedData.map(c => (
                    <TableCell key={c.name} className="text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {c.chips.map(chip => (
                          <span key={chip} className="bg-surface-container-low px-2 py-0.5 rounded text-[10px] text-on-surface-variant">{chip}</span>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="border-outline-variant/20">
                  <TableCell className="font-bold text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">verified</span>
                    Global Ranking
                  </TableCell>
                  {selectedData.map(c => (
                    <TableCell key={c.name} className="text-center text-sm text-on-surface-variant">
                      {c.highlights.find(h => h.icon === 'school')?.text || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="border-outline-variant/20">
                  <TableCell className="font-bold text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">work</span>
                    Work Post-Study
                  </TableCell>
                  {selectedData.map(c => (
                    <TableCell key={c.name} className="text-center text-sm text-on-surface-variant">
                      {c.highlights.find(h => h.icon === 'work')?.text || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="border-outline-variant/20">
                  <TableCell className="font-bold text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">payments</span>
                    Est. Tuition
                  </TableCell>
                  {selectedData.map(c => (
                    <TableCell key={c.name} className="text-center text-sm text-on-surface-variant">
                      {c.highlights.find(h => h.icon === 'payments')?.text || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-8 flex justify-center">
              <Link 
                to={`/consultation?country=${selectedCountries.length > 0 ? encodeURIComponent(selectedCountries[0]) : ""}`} 
                className="bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                onClick={() => setIsModalOpen(false)}
              >
                Apply for Selected Countries
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default CountriesPage;

