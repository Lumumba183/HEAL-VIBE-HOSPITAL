import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Globe } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (leftRef.current) leftRef.current.style.opacity = '1';
          if (rightRef.current) setTimeout(() => { rightRef.current!.style.opacity = '1'; rightRef.current!.style.transform = 'translateY(0)'; }, 200);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    if (leftRef.current) { leftRef.current.style.opacity = '0'; leftRef.current.style.transition = 'opacity 700ms ease-out'; }
    if (rightRef.current) { rightRef.current.style.opacity = '0'; rightRef.current.style.transform = 'translateY(40px)'; rightRef.current.style.transition = 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms'; }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  const inputCls = "w-full bg-white/[0.06] border border-white/[0.12] rounded-lg px-4 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-[#E8A243] transition-colors text-sm";

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-[#0F4A42]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:w-[45%]">
            <span className="block mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#E8A243]">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-[-0.01em] text-white mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              We're here to help
            </h2>
            <p className="text-base leading-[1.7] text-white/70 mb-10 max-w-[400px]">
              Visit us, call, or send a message. Our team is ready to assist you with appointments, enquiries, and healthcare support.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: 'Location', value: 'Off Rongai \u2013 Kiserian Road, opposite Total Petrol Station, next to Evo Lounge, Nairobi, Kenya' },
                { icon: Phone, label: 'Phone', value: '0786 122 511', href: 'tel:0786122511' },
                { icon: Globe, label: 'Website', value: 'healvibe.healthiify.com', href: 'https://healvibe.healthiify.com' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[#E8A243]" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-white mb-1">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.label === 'Website' ? '_blank' : undefined} rel={item.label === 'Website' ? 'noopener noreferrer' : undefined}
                        className="text-sm text-white/70 hover:text-white transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-sm text-white/70 leading-relaxed">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-[200px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6!2d36.74!3d-1.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjQnMDAuMCJTIDM2wrA0NCczNi4wIkE!5e0!3m2!1sen!2ske!4v1"
                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Heal Vibe Hospitals Location"
              />
            </div>
          </div>

          <div ref={rightRef} className="lg:w-[55%]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} required />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="General Enquiry" className="text-[#1A1A1A]">General Enquiry</option>
                  <option value="Book Appointment" className="text-[#1A1A1A]">Book Appointment</option>
                  <option value="Telemedicine" className="text-[#1A1A1A]">Telemedicine</option>
                  <option value="Chronic Care" className="text-[#1A1A1A]">Chronic Care</option>
                  <option value="Maternal Health" className="text-[#1A1A1A]">Maternal Health</option>
                  <option value="Corporate Wellness" className="text-[#1A1A1A]">Corporate Wellness</option>
                </select>
              </div>
              <textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} />
              <button type="submit" className="w-full bg-[#E8A243] text-[#0F4A42] text-sm font-semibold uppercase tracking-[0.04em] py-4 rounded-lg transition-colors duration-300 hover:bg-white">
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
