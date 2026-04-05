import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information Collection",
      content: "We collect information you provide directly to us through our consultation forms, including your name, email address, phone number, and academic preferences. We also automatically collect certain technical information when you visit our website, such as your IP address and browsing behavior."
    },
    {
      title: "2. How We Use Your Data",
      content: "Your information is used exclusively to provide our global education consultancy services, process your applications, and personalize your experience. We may use your contact details to send important updates regarding your academic journey or promotional materials related to study destinations."
    },
    {
      title: "3. Information Sharing",
      content: "Titas Global Education respects your privacy. We only share your data with partner universities and educational institutions specifically requested by you for application purposes. We do not sell your personal information to third parties."
    },
    {
      title: "4. Data Security",
      content: "We implement robust technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      title: "5. Cookies Policy",
      content: "Our website uses cookies to enhance user experience, analyze site traffic, and understand where our visitors are coming from. You can manage your cookie preferences through your browser settings."
    },
    {
      title: "6. Your Rights",
      content: "You have the right to access, correct, or delete your personal information held by us. If you wish to exercise these rights, please contact our data protection team at privacy@titasltd.com."
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-12 py-20 max-w-6xl mx-auto overflow-hidden text-center">
          <div className="relative z-10">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Legal & Privacy</span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-6">
              Privacy <span className="text-secondary">Policy</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              At Titas Global Education, we are committed to protecting your personal data and ensuring transparency in how we handle your information.
            </p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-secondary/5 blur-[120px] rounded-full"></div>
        </section>

        {/* Content Section */}
        <section className="px-12 max-w-4xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-[0_12px_40px_-5px_rgba(25,28,30,0.04)] border border-outline-variant/10">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-10 border-b border-outline-variant/20 pb-4">
              Last Updated: March 2024
            </p>
            
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title} className="group">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                    {section.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-[1.8] pl-4.5">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-surface-container-low rounded-2xl text-center">
              <h3 className="font-bold text-primary mb-4">Questions about our Privacy Policy?</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Our team is here to help you understand how we protect your information.
              </p>
              <a 
                href="mailto:privacy@titasltd.com" 
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                Contact Data Protection Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
