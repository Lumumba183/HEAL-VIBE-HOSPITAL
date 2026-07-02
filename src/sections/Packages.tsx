import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const packages = [
  { name: 'Individual Care', featured: false, description: 'General consultation, vital signs screening, health assessment, prescription, follow-up guidance, and teleconsultation option.' },
  { name: 'Chronic Care', featured: true, description: 'Doctor review, BP/glucose/weight tracking, medication review, lifestyle counselling, remote monitoring, and specialist referral.' },
  { name: 'Maternal Health', featured: false, description: 'Maternal consultation, BP monitoring, anaemia and blood sugar screening, danger sign education, nutrition guidance, and delivery planning.' },
  { name: 'Family Wellness', featured: false, description: 'Family health screening, parent and child wellness guidance, chronic disease risk assessment, maternal health support, and telemedicine access.' },
  { name: 'Corporate Wellness', featured: false, description: 'On-site screening, health talks, NCD risk assessment, mental wellness screening, nutrition education, and telemedicine access.' },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (headingRef.current) headingRef.current.style.opacity = '1';
          const cards = cardsContainerRef.current?.querySelectorAll('.package-card');
          cards?.forEach((card, i) => {
            setTimeout(() => { (card as HTMLElement).style.opacity = '1'; (card as HTMLElement).style.transform = 'translateX(0)'; }, i * 120);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    if (headingRef.current) { headingRef.current.style.opacity = '0'; headingRef.current.style.transition = 'opacity 600ms ease-out'; }
    const cards = cardsContainerRef.current?.querySelectorAll('.package-card');
    cards?.forEach((card) => { (card as HTMLElement).style.opacity = '0'; (card as HTMLElement).style.transform = 'translateX(40px)'; (card as HTMLElement).style.transition = 'opacity 700ms ease-out, transform 700ms ease-out'; });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" ref={sectionRef} className="py-20 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div ref={headingRef} className="text-center mb-12">
          <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1B6B5F]">CARE PACKAGES</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-[#1A1A1A]"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Choose the care that's right for you
          </h2>
        </div>

        <div ref={cardsContainerRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {packages.map((pkg) => (
            <div key={pkg.name} className={`package-card flex-shrink-0 w-[320px] md:w-[340px] bg-white rounded-2xl p-8 md:p-10 snap-start transition-shadow duration-300 hover:shadow-lg ${pkg.featured ? 'border-2 border-[#1B6B5F]' : ''}`}>
              {pkg.featured && (
                <span className="inline-block bg-[#1B6B5F] text-white text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded mb-4">Most Popular</span>
              )}
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{pkg.name}</h3>
              <p className="text-sm leading-relaxed text-[#6A6A6A] mb-6">{pkg.description}</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1B6B5F] hover:gap-3 transition-all duration-300">
                Get Started <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
