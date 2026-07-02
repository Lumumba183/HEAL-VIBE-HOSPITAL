import { useEffect, useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const serviceLinks = ['Outpatient Care', 'Telemedicine', 'Preventive Health', 'Chronic Care', 'Maternal Health', 'Wellness'];
const companyLinks = ['About Us', 'Our Team', 'Healthiify Partnership', 'Careers', 'News'];
const supportLinks = ['Contact', 'Book Appointment', 'FAQs', 'Privacy Policy', 'Terms of Service'];
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          columnsRef.current.forEach((col, i) => {
            if (col) setTimeout(() => { col.style.opacity = '1'; }, i * 100);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    columnsRef.current.forEach((col) => { if (col) { col.style.opacity = '0'; col.style.transition = 'opacity 600ms ease-out'; } });

    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-[#1A1A1A] pt-16 md:pt-20 pb-8 md:pb-10 px-5 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div ref={(el) => { columnsRef.current[0] = el; }} className="lg:col-span-1">
            <span className="block text-2xl text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Heal Vibe</span>
            <p className="text-sm text-[#6A6A6A] mb-6">Empowering Better Health</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} aria-label={social.label}
                    className="text-[#6A6A6A] hover:text-[#E8A243] transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div ref={(el) => { columnsRef.current[1] = el; }}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#6A6A6A] mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" onClick={(e) => handleNav(e, '#services')}
                    className="text-sm text-[#AAAAAA] hover:text-white transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div ref={(el) => { columnsRef.current[2] = el; }}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#6A6A6A] mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#about" onClick={(e) => handleNav(e, '#about')}
                    className="text-sm text-[#AAAAAA] hover:text-white transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div ref={(el) => { columnsRef.current[3] = el; }}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#6A6A6A] mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#contact" onClick={(e) => handleNav(e, '#contact')}
                    className="text-sm text-[#AAAAAA] hover:text-white transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[13px] text-[#6A6A6A]">2026 Heal Vibe Hospitals. All rights reserved.</span>
          <span className="text-[13px] text-[#6A6A6A]">In partnership with Healthiify Global</span>
        </div>
      </div>
    </footer>
  );
}
