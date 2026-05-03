import Hero from '../components/sections/Hero';
import OurValue from '../components/sections/OurValue';
import Proof from '../components/sections/Proof';
import WhoWeAre from '../components/sections/WhoWeAre';
import Homeowners from '../components/sections/Homeowners';
import Services from '../components/sections/Services';
import Investors from '../components/sections/Investors';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurValue />
      <Proof />
      <WhoWeAre />
      <Homeowners />
      <Services />
      <Investors />
      <Projects />
      <Contact />
    </>
  );
}
