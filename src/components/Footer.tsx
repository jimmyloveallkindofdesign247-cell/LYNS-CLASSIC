import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, Check, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#111111] via-[#0d0d0d] to-[#050505] text-zinc-300 border-t border-white/10 relative overflow-hidden">
      {/* Subtle brand glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-transparent via-indigo-600/10 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#4f46e5] via-[#ff007f] to-[#facc15] p-[1.5px]">
                <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center font-bold text-xs tracking-widest text-white">
                  LC
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase font-['Outfit']">
                LYNS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-300">CLASSIC</span>
              </span>
            </button>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              High-end clothing design brand redefining modern elegance. Blending the discipline of master tailoring with fearless streetwear couture.
            </p>

            <div className="pt-2 text-xs font-mono text-zinc-500">
              <p>Atelier: London · Paris · New York</p>
              <p className="mt-1 text-[#facc15]">Limited production capsules only.</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-white">
              Collections
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#ff007f] transition-colors cursor-pointer"
                >
                  Evening Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#facc15] transition-colors cursor-pointer"
                >
                  Streetwear Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#818cf8] transition-colors cursor-pointer"
                >
                  Bespoke Tailored Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Runway Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Private Commissions
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-white">
              Studio & Contact
            </h3>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>84 Haute Couture Promenade, London W1K</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                <a
                  href="mailto:concierge@lynsclassic.com"
                  className="hover:text-white transition-colors"
                >
                  concierge@lynsclassic.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                <a
                  href="tel:+442079460892"
                  className="hover:text-white transition-colors font-mono"
                >
                  +44 (0) 20 7946 0892
                </a>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1">
                Mon - Sat: 10:00 - 19:00 GMT · By Appointment
              </p>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-white">
              Private Salon Dispatch
            </h3>
            <p className="text-xs text-zinc-400">
              Receive private invitations to runway debuts and limited edition garment releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your VIP email"
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff007f]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#4f46e5] to-[#ff007f] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed to VIP Salon</span>
                  </>
                ) : (
                  <span>Request VIP Access</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* PROMINENT SOCIAL MEDIA FOOTER (Clickable Icons for Facebook, Instagram, and WhatsApp) */}
        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Connect with LYNS CLASSIC Worldwide
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Join our private social communities for backstage lookbook previews and live atelier stories.
            </p>
          </div>

          {/* Social Icons with Smooth Hover Animations & Distinct Brand Accents */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#ff007f] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff007f]/30 cursor-pointer flex items-center justify-center"
              aria-label="LYNS CLASSIC on Instagram"
              title="Instagram"
            >
              <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-zinc-300 group-hover:text-[#ff007f]" />
              <span className="sr-only">Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#4f46e5] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4f46e5]/30 cursor-pointer flex items-center justify-center"
              aria-label="LYNS CLASSIC on Facebook"
              title="Facebook"
            >
              <FacebookIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-zinc-300 group-hover:text-[#818cf8]" />
              <span className="sr-only">Facebook</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/447700900123"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#facc15] text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#facc15]/30 cursor-pointer flex items-center justify-center"
              aria-label="Direct WhatsApp Atelier Concierge"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-zinc-300 group-hover:text-[#facc15]" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} LYNS CLASSIC Fashion Hub. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Redefining Modern Elegance</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Authentic Vector Logos for Facebook, Instagram, WhatsApp */
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.031 2C6.496 2 2 6.49 2 12.015c0 1.797.478 3.548 1.385 5.093L2 22l5.034-1.32a9.972 9.972 0 0 0 4.997 1.335h.004c5.534 0 10.03-4.49 10.03-10.015A9.99 9.99 0 0 0 12.031 2zm5.832 14.183c-.244.685-1.42 1.306-1.959 1.387-.514.078-1.183.109-1.9-.119-.434-.139-.99-.323-1.704-.63-3.004-1.298-4.962-4.324-5.113-4.524-.15-.2-1.223-1.628-1.223-3.105 0-1.477.773-2.204 1.048-2.503.275-.3.6-.375.8-.375s.4.01.575.01c.185.01.433-.07.675.518.25.604.85 2.082.925 2.232.075.15.125.325.025.526-.1.2-.15.326-.3.501-.15.176-.315.392-.451.526-.15.149-.306.311-.131.611.176.301.78 1.288 1.674 2.087 1.15 1.025 2.119 1.343 2.42 1.493.3.15.475.125.65-.076.175-.201.75-.879.95-1.18.2-.301.4-.25.675-.15.276.101 1.755.829 2.056.979.3.15.5.225.575.35.075.126.075.728-.169 1.413z" />
  </svg>
);
