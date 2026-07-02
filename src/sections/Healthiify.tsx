import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const features = [
  'Teleconsultation access from anywhere',
  'Digital patient follow-up and reminders',
  'Remote patient monitoring for chronic conditions',
  'Specialist coordination and referral support',
  'Health records and patient-held tracking tools',
  "Afya Fiti 'Know Your Numbers' programs",
];

export default function Healthiify() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (leftRef.current) { leftRef.current.style.opacity = '1'; leftRef.current.style.transform = 'translateX(0)'; }
          if (rightRef.current) setTimeout(() => { rightRef.current!.style.opacity = '1'; rightRef.current!.style.transform = 'translateX(0)'; }, 200);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    if (leftRef.current) { leftRef.current.style.opacity = '0'; leftRef.current.style.transform = 'translateX(-40px)'; leftRef.current.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out'; }
    if (rightRef.current) { rightRef.current.style.opacity = '0'; rightRef.current.style.transform = 'translateX(40px)'; rightRef.current.style.transition = 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms'; }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:w-[55%]">
            <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1B6B5F]">POWERED BY HEALTHIIFY</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-[#1A1A1A] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              Technology that keeps you connected
            </h2>
            <p className="text-base leading-[1.7] tracking-[0.01em] text-[#4A4A4A] mb-8 max-w-[480px]">
              Heal Vibe Hospitals is supported by Healthiify's digital health ecosystem, enabling a more connected and continuous healthcare experience that goes beyond traditional clinic-based care.
            </p>
            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1B6B5F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] text-[#1A1A1A]">{feature}</span>
                </div>
              ))}
            </div>
            <a href="https://healvibe.healthiify.com" target="_blank" rel="noopener noreferrer"
              className="inline-block border border-[#1B6B5F] text-[#1B6B5F] text-sm font-medium uppercase tracking-[0.04em] px-8 py-3.5 rounded-md transition-all duration-300 hover:bg-[#1B6B5F] hover:text-white">
              Learn More
            </a>
          </div>
          <div ref={rightRef} className="lg:w-[45%]">
            <div className="relative">
              <img src="/img-healthiify.jpg" alt="Healthiify digital health platform" className="w-full max-w-[450px] mx-auto rounded-2xl shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#E8F5F2] rounded-full -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E8A243]/20 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
