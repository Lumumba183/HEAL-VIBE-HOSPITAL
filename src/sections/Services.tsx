import { useEffect, useRef } from 'react';
import { Stethoscope, Video, ShieldCheck, HeartPulse, Baby, Sparkles } from 'lucide-react';

const services = [
  { icon: Stethoscope, title: 'Outpatient Care', description: 'General consultations, clinical assessments, diagnoses, prescriptions, and follow-up visits with compassionate, patient-focused care.' },
  { icon: Video, title: 'Telemedicine', description: 'Virtual consultations for follow-ups, medication reviews, chronic disease monitoring, and specialist coordination — care from wherever you are.' },
  { icon: ShieldCheck, title: 'Preventive Health', description: 'Blood pressure, blood sugar, BMI screening, cardiovascular risk assessment, and lifestyle counselling to catch issues early.' },
  { icon: HeartPulse, title: 'Chronic Care', description: 'Structured management for hypertension, diabetes, asthma, obesity, and more — with continuous follow-up and monitoring.' },
  { icon: Baby, title: 'Maternal Health', description: 'Antenatal screening, risk identification, nutrition guidance, teleconsultation, and delivery planning for expectant mothers.' },
  { icon: Sparkles, title: 'Wellness Programs', description: 'Corporate wellness, health talks, nutrition counselling, mental wellness screening, and community outreach programs.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (headingRef.current) {
            headingRef.current.style.opacity = '1';
            headingRef.current.style.transform = 'translateX(0)';
          }
          cardsRef.current.forEach((card, i) => {
            if (card) setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, i * 100);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateX(-40px)';
      headingRef.current.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out';
    }
    cardsRef.current.forEach((card) => {
      if (card) { card.style.opacity = '0'; card.style.transform = 'translateY(30px)'; card.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out'; }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Sticky Heading */}
          <div ref={headingRef} className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1B6B5F]">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-[#1A1A1A] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              Comprehensive care for every stage of life
            </h2>
            <p className="text-base leading-[1.7] tracking-[0.01em] text-[#4A4A4A] mb-6 max-w-[360px]">
              From preventive screenings to chronic disease management, we offer a full spectrum of healthcare services designed around your needs.
            </p>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1B6B5F] hover:underline">
              View all services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Right - Cards Grid */}
          <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={service.title} ref={(el) => { cardsRef.current[i] = el; }}
                  className="bg-[#FAF8F5] rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_32px_rgba(27,107,95,0.08)] cursor-default group">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5F2] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="text-[#1B6B5F]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6A6A6A]">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
