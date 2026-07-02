import { useEffect, useRef } from 'react';
import Carousel from '../components/Carousel';

export default function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const animate = (el: HTMLElement | null, delay: number, slideUp = true) => {
      if (!el) return;
      el.style.opacity = '0';
      if (slideUp) el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        el.style.transition = `opacity ${slideUp ? 800 : 600}ms ease-out ${delay}ms, transform 800ms ease-out ${delay}ms`;
        el.style.opacity = '1';
        if (slideUp) el.style.transform = 'translateY(0)';
      }, 50);
    };

    animate(labelRef.current, 200);
    animate(line1Ref.current, 400);
    animate(line2Ref.current, 550);
    animate(bodyRef.current, 700);
    animate(ctaRef.current, 900, false);
    animate(trustRef.current, 1000, false);

    const video = videoRef.current;
    if (video) video.play().catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#FAF8F5]">
      {/* Mobile Video Background */}
      <div className="absolute inset-0 md:hidden">
        <video ref={videoRef} className="w-full h-full object-cover" src="/vid-hero-bg.mp4" muted loop playsInline autoPlay />
        <div className="absolute inset-0 bg-[#FAF8F5]/80" />
      </div>

      {/* Desktop 3D Carousel */}
      <Carousel />

      {/* Content */}
      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="w-full md:w-[55%] px-5 md:px-12 lg:px-16 py-24 md:py-0">
          <div className="max-w-[520px]">
            <span ref={labelRef} className="inline-block mb-6 text-xs font-medium uppercase tracking-[0.12em] text-[#1B6B5F]">
              PATIENT-CENTERED HEALTHCARE
            </span>

            <h1 className="mb-6">
              <span ref={line1Ref} className="block text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.02em] text-[#1A1A1A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                Healing with
              </span>
              <span ref={line2Ref} className="block text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.02em] text-[#1B6B5F]"
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                compassion & care
              </span>
            </h1>

            <p ref={bodyRef} className="text-lg leading-[1.7] tracking-[0.01em] text-[#4A4A4A] max-w-[480px] mb-8">
              At Heal Vibe Hospitals, we combine quality outpatient care with telemedicine, preventive screening, and chronic disease management. Healthcare that treats illness, helps you understand your health, and delivers the right care at the right time.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="inline-block bg-[#1B6B5F] text-white text-sm font-medium uppercase tracking-[0.04em] px-9 py-4 rounded-md transition-colors duration-300 hover:bg-[#0F4A42]">
                Book Appointment
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                className="inline-block border border-[#1B6B5F] text-[#1B6B5F] text-sm font-medium uppercase tracking-[0.04em] px-9 py-4 rounded-md transition-all duration-300 hover:bg-[#1B6B5F] hover:text-white">
                Our Services
              </a>
            </div>

            <div ref={trustRef} className="flex items-center gap-6 text-sm text-[#6A6A6A]">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1B6B5F]" />24/7 Care</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1B6B5F]" />Telemedicine</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1B6B5F]" />Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
