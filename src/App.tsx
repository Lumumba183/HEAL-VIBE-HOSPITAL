import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import PatientJourney from './sections/PatientJourney';
import Healthiify from './sections/Healthiify';
import Packages from './sections/Packages';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#FAF8F5]">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <PatientJourney />
        <Healthiify />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
