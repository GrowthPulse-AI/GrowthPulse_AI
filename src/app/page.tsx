import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { LeadCapture } from "@/components/LeadCapture";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Pricing />
        <LeadCapture />
      </main>
      <Footer />
    </>
  );
}
