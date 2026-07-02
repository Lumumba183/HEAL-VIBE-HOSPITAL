import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Patient Care', href: '#packages' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-20px)';
    requestAnimationFrame(() => {
      nav.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out';
      nav.style.opacity = '1';
      nav.style.transform = 'translateY(0)';
    });
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
      style={{
        height: '72px',
        backgroundColor: 'rgba(250, 248, 245, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(27, 107, 95, 0.08)',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-[#1B6B5F] text-xl tracking-tight shrink-0"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Heal Vibe
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-sm font-medium uppercase tracking-[0.04em] text-[#1A1A1A] hover:text-[#1B6B5F] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-[#1B6B5F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact')}
          className="hidden md:inline-block bg-[#1B6B5F] text-white text-sm font-medium uppercase tracking-[0.04em] px-7 py-3 rounded-md transition-colors duration-300 hover:bg-[#0F4A42] shrink-0"
        >
          Book Appointment
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1A1A1A] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[#FAF8F5] border-b border-[rgba(27,107,95,0.08)] md:hidden py-6 px-5 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium uppercase tracking-[0.04em] text-[#1A1A1A] py-2 hover:text-[#1B6B5F] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-block bg-[#1B6B5F] text-white text-sm font-medium uppercase tracking-[0.04em] px-7 py-3 rounded-md transition-colors duration-300 hover:bg-[#0F4A42] text-center mt-2"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
