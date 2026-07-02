import { useEffect, useRef } from 'react';

const steps = [
  { number: '01', title: 'Book a Visit', description: 'Schedule an appointment online, by phone, or walk in. Our team is ready to welcome you.', align: 'left' as const },
  { number: '02', title: 'Consultation & Assessment', description: 'Meet with our clinicians for a thorough assessment, diagnosis, and personalized treatment plan.', align: 'right' as const },
  { number: '03', title: 'Personalized Care Plan', description: 'Receive a clear care plan with medication guidance, lifestyle recommendations, and follow-up scheduling.', align: 'left' as const },
  { number: '04', title: 'Ongoing Support', description: 'Access continuous care through telemedicine follow-ups, remote monitoring, and our Healthiify digital platform.', align: 'right' as const },
];

export default function PatientJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (headingRef.current) headingRef.current.style.opacity = '1';
          if (lineRef.current) setTimeout(() => { lineRef.current!.style.transform = 'scaleY(1)'; }, 300);
          stepsRef.current.forEach((step, i) => {
            if (step) setTimeout(() => { step.style.opacity = '1'; step.style.transform = 'translateX(0)'; }, 300 + i * 150);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    if (headingRef.current) { headingRef.current.style.opacity = '0'; headingRef.current.style.transition = 'opacity 600ms ease-out'; }
    if (lineRef.current) { lineRef.current.style.transform = 'scaleY(0)'; lineRef.current.style.transformOrigin = 'top'; lineRef.current.style.transition = 'transform 1200ms ease-out'; }
    stepsRef.current.forEach((step, i) => {
      if (step) {
        const isLeft = steps[i].align === 'left';
        step.style.opacity = '0';
        step.style.transform = `translateX(${isLeft ? '-30px' : '30px'})`;
        step.style.transition = 'opacity 700ms ease-out, transform 700ms ease-out';
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-[1000px] mx-auto px-5 md:px-12">
        <div ref={headingRef} className="text-center mb-16">
          <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1B6B5F]">YOUR JOURNEY</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-[#1A1A1A]"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Your path to better health
          </h2>
        </div>

        <div className="relative">
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(27,107,95,0.15)] hidden md:block" style={{ marginLeft: '-1px' }} />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} ref={(el) => { stepsRef.current[i] = el; }}
                className={`relative md:grid md:grid-cols-2 md:gap-16 ${i > 0 ? 'md:mt-16' : ''}`}>
                <div className={`${step.align === 'right' ? 'md:col-start-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <span className="block text-6xl md:text-7xl font-normal mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif", color: 'rgba(27, 107, 95, 0.12)' }}>
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#4A4A4A] max-w-[360px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {step.description}
                  </p>
                </div>
                <div className="hidden md:flex items-start justify-center absolute left-1/2 top-8" style={{ marginLeft: '-6px' }}>
                  <div className="w-3 h-3 rounded-full bg-[#1B6B5F] ring-4 ring-[#FAF8F5]" />
                </div>
                <div className={step.align === 'right' ? 'hidden md:block' : 'hidden md:block md:col-start-2'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
