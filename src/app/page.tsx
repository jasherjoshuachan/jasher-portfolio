import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import MobileNav from "@/components/MobileNav";
import ScrollToTop from "@/components/ScrollToTop";
import SectionPill from "@/components/SectionPill";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jasher Joshua A. Chan",
  jobTitle: "AI Automation Engineer & Systems Developer",
  description:
    "AI Automation Engineer specialising in multi-agent architectures, workflow automation, and operational platforms for international SMEs and AI-native agencies. Certified QuickBooks ProAdvisor and Xero Advisor — automation that handles real money correctly.",
  url: "https://jasherchan.truehubsolutions.com",
  image: "https://jasherchan.truehubsolutions.com/jasher-avatar.png",
  email: "jasherchan@truehubsolutions.com",
  telephone: "+63-991-916-4468",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bacolod City",
    addressRegion: "Negros Occidental",
    addressCountry: "PH",
  },
  sameAs: ["https://www.linkedin.com/in/jasherchan", "https://github.com/jasherjoshuachan"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of St. La Salle",
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "QuickBooks ProAdvisor", credentialCategory: "Certification", recognizedBy: { "@type": "Organization", name: "Intuit" } },
    { "@type": "EducationalOccupationalCredential", name: "Xero Advisor Certified", credentialCategory: "Certification", recognizedBy: { "@type": "Organization", name: "Xero Limited" } },
  ],
  knowsAbout: [
    "AI Agent Architecture", "Multi-Agent Systems", "Workflow Automation", "n8n",
    "Claude AI", "OpenAI API", "Generative AI", "LLM Integration", "Prompt Engineering",
    "Business Process Automation", "API Integration", "Python", "FastAPI", "Next.js",
    "Bookkeeping", "Xero", "QuickBooks", "Financial Reporting", "Operations Management",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <BentoGrid />
      </div>
      <SectionPill />
      <MobileNav />
      <ScrollToTop />
    </>
  );
}
