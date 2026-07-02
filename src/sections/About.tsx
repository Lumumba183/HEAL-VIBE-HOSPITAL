import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (imageRef.current) { imageRef.current.style.opacity = '1'; imageRef.current.style.transform = 'translateX(0)'; }
          textRefs.current.forEach((el, i) => {
            if (el) setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; }, 200 + i * 120);
          });
          if (svgRef.current) {
            const svgDraw = svgRef.current.querySelector('.svg-draw');
            if (svgDraw) svgDraw.classList.add('active');
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    if (imageRef.current) {
      imageRef.current.style.opacity = '0'; imageRef.current.style.transform = 'translateX(-60px)';
      imageRef.current.style.transition = 'opacity 1000ms ease-out, transform 1000ms ease-out';
    }
    textRefs.current.forEach((el) => {
      if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(30px)'; el.style.transition = 'opacity 700ms ease-out, transform 700ms ease-out'; }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-[#0F4A42] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="lg:w-[50%] relative">
            <img src="/img-about.jpg" alt="Heal Vibe Hospitals facility in Nairobi" className="w-full h-[400px] lg:h-[600px] object-cover lg:rounded-r-2xl" />
            <div ref={svgRef} className="about-svg-container absolute bottom-8 right-8 lg:bottom-12 lg:right-12 opacity-60">
              <svg className="svg-draw" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="200" height="100">
                <path d="M 50 100 Q 150 50 250 100 T 450 100" stroke="#1B6B5F" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="500" style={{ '--path-length': '500' } as React.CSSProperties} />
                <path d="M 50 120 Q 150 70 250 120 T 450 120" stroke="#E8A243" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" strokeDasharray="500" style={{ '--path-length': '500', transitionDelay: '0.2s' } as React.CSSProperties} />
                <path d="M 200 100 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0" stroke="#1B6B5F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="200" style={{ '--path-length': '200', transitionDelay: '0.5s' } as React.CSSProperties} />
                <path d="M 180 100 L 220 100" stroke="#1B6B5F" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="50" style={{ '--path-length': '50', transitionDelay: '0.8s' } as React.CSSProperties} />
                <path d="M 200 80 L 200 120" stroke="#1B6B5F" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="50" style={{ '--path-length': '50', transitionDelay: '0.9s' } as React.CSSProperties} />
              </svg>
            </div>
          </div>

          {/* Right - Text */}
          <div className="lg:w-[50%] px-5 md:px-12 lg:px-16 py-12 lg:py-0">
            <div ref={(el) => { textRefs.current[0] = el; }}>
              <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#E8A243]">ABOUT HEAL VIBE</span>
            </div>
            <div ref={(el) => { textRefs.current[1] = el; }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-white mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                Healthcare that puts patients first
              </h2>
            </div>
            <div ref={(el) => { textRefs.current[2] = el; }}>
              <p className="text-base leading-[1.7] text-white/80 mb-5">
                Heal Vibe Hospitals is a modern, patient-centred healthcare provider in Nairobi, designed to make quality healthcare more accessible, preventive, continuous, and convenient. We combine physical outpatient services with telemedicine, preventive screening, chronic disease care, and coordinated referral pathways.
              </p>
            </div>
            <div ref={(el) => { textRefs.current[3] = el; }}>
              <p className="text-base leading-[1.7] text-white/70 mb-10">
                Our model is built around one simple belief: healthcare should not only treat illness, but also help people understand their health, track their numbers, prevent complications, and access the right care at the right time.
              </p>
            </div>
            <div ref={(el) => { textRefs.current[4] = el; }} className="grid grid-cols-3 gap-8">
              {[
                { num: '15+', label: 'Specialist Partners' },
                { num: '7', label: 'Core Services' },
                { num: '24/7', label: 'Care Available' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-4xl text-[#E8A243] mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>{stat.num}</span>
                  <span className="text-sm text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
