import Hero from '@/components/Hero';
import BrandStrip from '@/components/BrandStrip';
import HowItWorks from '@/components/HowItWorks';
import ValueProps from '@/components/ValueProps';
import ForWho from '@/components/ForWho';
import SocialProof from '@/components/SocialProof';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <BrandStrip />
        <HowItWorks />
        <ValueProps />
        <ForWho />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
