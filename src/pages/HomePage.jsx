import Hero from '../components/home/Hero';
import OurValue from '../components/home/OurValue';
import WhoWeAre from '../components/home/WhoWeAre';
import Projects from '../components/home/Projects';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurValue />
      <WhoWeAre />
      <Projects />
      <Reviews />
      <Contact />
    </>
  );
}
