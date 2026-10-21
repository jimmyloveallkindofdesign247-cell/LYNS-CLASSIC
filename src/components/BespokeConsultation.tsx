import React, { useState } from 'react';
import { validateBespokeBooking } from '../utils/validation';
import { BespokeInquiry } from '../types/fashion';
import { Calendar, Clock, MapPin, Mail, Phone, CheckCircle2, Scissors, ArrowRight, MessageCircle } from 'lucide-react';

interface BespokeConsultationProps {
  initialGarment?: string;
}

export const BespokeConsultation: React.FC<BespokeConsultationProps> = ({ initialGarment }) => {
  const [formData, setFormData] = useState<BespokeInquiry>({
    name: '',
    email: '',
    phone: '',
    collectionInterest: initialGarment || 'Tailored Suits',
    fittingDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBespokeBooking(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      collectionInterest: 'Tailored Suits',
      fittingDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-dark-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Atelier Address & Private Fitting Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#facc15]">
                <Scissors className="w-3.5 h-3.5" />
                <span>Private Consultations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
                Book a Bespoke <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#818cf8]">
                  Atelier Fitting
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Whether commissioning a one-of-a-kind evening gown, a custom-measured suit, or an avant-garde runway piece, our master tailors provide one-on-one appointments.
              </p>
            </div>

            {/* Studio Contact Info Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-zinc-400">Atelier Location</p>
                  <p className="text-sm font-bold text-white mt-0.5">LYNS CLASSIC Flagship & Private Salon</p>
                  <p className="text-xs text-zinc-400">84 Haute Couture Promenade, Fashion District, London / Paris</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-pink-500/10 text-[#ff007f] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-zinc-400">VIP Concierge & Enquiries</p>
                  <a
                    href="mailto:concierge@lynsclassic.com"
                    className="text-sm font-bold text-white hover:text-[#ff007f] transition-colors mt-0.5 block"
                  >
                    concierge@lynsclassic.com
                  </a>
                  <p className="text-xs text-zinc-400">Guaranteed response within 4 hours</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 text-[#facc15] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-zinc-400">Direct Telephone / WhatsApp</p>
                  <a
                    href="https://wa.me/447700900123"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-white hover:text-[#facc15] transition-colors mt-0.5 block font-mono"
                  >
                    +44 (0) 20 7946 0892
                  </a>
                  <p className="text-xs text-zinc-400">Monday – Saturday: 10:00 – 19:00 GMT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#facc15] uppercase tracking-widest">
                      Fitting Requested
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      We Look Forward to Welcoming You
                    </h3>
                    <p className="text-zinc-300 text-sm max-w-md mx-auto">
                      Thank you, <span className="font-bold text-white">{formData.name}</span>. Our Master Tailor has received your request for{' '}
                      <span className="text-[#818cf8] font-bold">{formData.collectionInterest}</span> on{' '}
                      <span className="font-mono text-white">{formData.fittingDate}</span>. An atelier invitation has been sent to {formData.email}.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase font-bold tracking-wider cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white font-['Outfit']">
                      Private Appointment Request
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Fill out the form below to book a bespoke consultation with our head couturier.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-mono text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Julian Montgomery"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-white/10 focus:border-[#ff007f]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block text-xs font-mono text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@couture.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-white/10 focus:border-[#ff007f]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone-input" className="block text-xs font-mono text-zinc-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7700 900123"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-xs placeholder-zinc-500 focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-[#ff007f]'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="collection-select" className="block text-xs font-mono text-zinc-300 mb-1">
                        Collection of Interest *
                      </label>
                      <select
                        id="collection-select"
                        value={formData.collectionInterest}
                        onChange={(e) => setFormData({ ...formData, collectionInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#facc15] cursor-pointer"
                      >
                        <option value="Tailored Suits">Tailored Suits & Tuxedos</option>
                        <option value="Evening Wear">Evening Wear & Haute Gowns</option>
                        <option value="Streetwear Couture">Streetwear Couture & Outerwear</option>
                        <option value="Full Wardrobe Commission">Full Bespoke Wardrobe Commission</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date-input" className="block text-xs font-mono text-zinc-300 mb-1">
                      Preferred Fitting Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="date-input"
                        type="date"
                        value={formData.fittingDate}
                        onChange={(e) => setFormData({ ...formData, fittingDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#facc15]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes-input" className="block text-xs font-mono text-zinc-300 mb-1">
                      Custom Sizing Notes or Special Requests (Optional)
                    </label>
                    <textarea
                      id="notes-input"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify your measurements, event date, or desired custom fabrics..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#ff007f] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] hover:from-[#4338ca] hover:to-[#e11d48] shadow-xl shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Fitting...</span>
                    ) : (
                      <>
                        <span>Submit Atelier Appointment Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
