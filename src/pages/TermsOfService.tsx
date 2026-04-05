import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our services. Our services include our website (titasltd.com) and our offline global education consultancy programs."
    },
    {
      title: "2. Description of Service",
      content: "Titas Global Education provides consultancy services to students seeking admission to international universities. These services include academic counseling, university matching, admission assistance, and visa guidance. We do not guarantee admission to any specific institution."
    },
    {
      title: "3. User Responsibilities",
      content: "Users are responsible for providing accurate and complete information during their application process. Any form of misrepresentation or submission of fraudulent documents will result in immediate termination of services and potentially legal action by the relevant authorities."
    },
    {
      title: "4. Intellectual Property",
      content: "All content on our website, including logos, text, graphics, and proprietary information, is the property of Titas Global Ltd. and is protected by international copyright and trademark laws. Unauthorized use of this material is strictly prohibited."
    },
    {
      title: "5. Limitation of Liability",
      content: "Titas Global Education shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or the decisions made by universities or visa authorities regarding your application."
    },
    {
      title: "6. Governing Law",
      content: "These Terms of Service are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Dhaka, Bangladesh."
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-12 py-20 max-w-6xl mx-auto overflow-hidden text-center">
          <div className="relative z-10">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Legal & Compliance</span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-6">
              Terms of <span className="text-secondary">Service</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Our terms are designed to ensure transparency and a professional relationship between Titas Global Education and our prospective scholars.
            </p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-secondary/5 blur-[120px] rounded-full"></div>
        </section>

        {/* Content Section */}
        <section className="px-12 max-w-4xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-[0_12px_40px_-5px_rgba(25,28,30,0.04)] border border-outline-variant/10">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-10 border-b border-outline-variant/20 pb-4">
              Effective Date: March 2024
            </p>
            
            <div className="space-y-12">
              {terms.map((term) => (
                <div key={term.title} className="group">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                    {term.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-[1.8] pl-4.5">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-surface-container-low rounded-2xl text-center">
              <h3 className="font-bold text-primary mb-4">Want to discuss our terms?</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Our legal and customer success teams are always available for clarification.
              </p>
              <a 
                href="mailto:legal@titasltd.com" 
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                Contact Legal Department
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
