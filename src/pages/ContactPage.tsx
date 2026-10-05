import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: 'Transmission Line',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const waUrl = getWhatsAppUrl(
    formData.subject
      ? `Hello Kyoly Construction, inquiry regarding ${formData.subject} (${formData.service})`
      : undefined
  );

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D6A548] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A548]/15 border border-[#D6A548]/30 text-xs font-mono text-[#D6A548] uppercase tracking-wider">
              <span>GET IN TOUCH WITH OUR ENGINEERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Connect directly with our engineering management and estimation teams in Kathmandu Valley and allover Nepal for tender bidding, project consultations, and joint ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Editable Company Details */}
            <div className="lg:col-span-5 space-y-8">
              <SectionHeading
                kicker="Company Coordinates"
                title="Office & Contact Information"
                subtitle="All contact information is verified and easily editable in our central directory."
              />

              {/* Direct Call & WhatsApp Quick Card */}
              <div className="p-6 rounded-2xl bg-[#0F172A] text-white border-2 border-[#D6A548] space-y-4 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-32 h-32 engineering-diagonal-pattern opacity-20" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F4511E] flex items-center justify-center text-white shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono tracking-wider text-[#D6A548]">
                      Official Phone Number
                    </div>
                    <a
                      href={`tel:${siteConfig.phoneDisplay}`}
                      className="text-2xl font-black text-white hover:text-[#D6A548] font-mono tracking-wide"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.031 2C6.516 2 2.025 6.49 2.025 12c0 1.954.567 3.774 1.543 5.316L2 22l4.834-1.53c1.478.887 3.208 1.402 5.067 1.402h.005c5.514 0 10.005-4.49 10.005-10 0-5.511-4.49-10-9.88-10zm0 18.232h-.004c-1.637 0-3.167-.45-4.48-1.233l-.322-.191-3.327 1.053 1.077-3.238-.21-.334c-.878-1.396-1.341-3.024-1.341-4.707 0-4.664 3.795-8.459 8.608-8.459 4.811 0 8.604 3.795 8.604 8.459 0 4.665-3.792 8.65-8.605 8.65zm4.721-6.474c-.259-.13-1.531-.756-1.768-.842-.238-.087-.41-.13-.583.13-.173.259-.669.842-.821 1.015-.151.173-.303.195-.562.065-.259-.13-1.095-.404-2.086-1.288-.771-.688-1.292-1.538-1.443-1.797-.151-.26-.016-.4.113-.529.117-.117.26-.303.389-.455.13-.151.173-.259.259-.432.087-.173.043-.325-.022-.455-.065-.13-.583-1.406-.8-1.928-.211-.508-.426-.439-.583-.447l-.497-.009c-.173 0-.454.065-.691.325-.238.259-.908.887-.908 2.162s.93 2.508 1.06 2.681c.13.173 1.83 2.795 4.433 3.92.619.268 1.103.428 1.48.548.622.198 1.189.17 1.637.103.499-.075 1.531-.626 1.747-1.231.216-.605.216-1.124.151-1.231-.064-.108-.237-.173-.496-.303z" />
                    </svg>
                    <span>Message Directly on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Office Addresses */}
              <div className="space-y-4">
                {/* Head Office */}
                <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] uppercase font-mono">
                    <MapPin className="w-4 h-4 text-[#F4511E]" />
                    <span>Head Office Address</span>
                  </div>
                  <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A]">
                    {siteConfig.headOffice}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Kathmandu Valley Corporate HQ · Near Ring Road, Lalitpur
                  </p>
                </div>

                {/* Regional Office */}
                {siteConfig.regionalOffice && (
                  <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC] space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D6A548] uppercase font-mono">
                      <MapPin className="w-4 h-4 text-[#D6A548]" />
                      <span>Regional Branch Address</span>
                    </div>
                    <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A]">
                      {siteConfig.regionalOffice}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Regional Operations & Field Logistics
                    </p>
                  </div>
                )}

                {/* Email & Facebook links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                      <Mail className="w-3.5 h-3.5 text-[#D6A548]" />
                      <span>Official Email</span>
                    </div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-xs font-bold text-[#0F172A] hover:text-[#1E3A8A] truncate block"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                      <ExternalLink className="w-3.5 h-3.5 text-[#1877F2]" />
                      <span>Facebook Page</span>
                    </div>
                    <a
                      href={siteConfig.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#1877F2] hover:underline truncate block"
                    >
                      Kyoly Construction Pvt. Ltd.
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Visual Embed / Schematic */}
              <div className="rounded-xl border border-neutral-200 overflow-hidden bg-slate-100">
                <div className="p-3 bg-[#0F172A] text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5 font-['Outfit']">
                    <MapPin className="w-3.5 h-3.5 text-[#F4511E]" />
                    Google Maps Location Overview
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Nepal Coordinates</span>
                </div>
                {/* Styled interactive map container */}
                <div className="h-44 w-full bg-slate-200 relative flex items-center justify-center text-center p-4">
                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white mx-auto flex items-center justify-center shadow-md">
                      <MapPin className="w-5 h-5 text-[#D6A548]" />
                    </div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      Kyoly Construction Pvt. Ltd.
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Buddhanagar-10, New Baneshwor, Kathmandu, Nepal
                    </div>
                    <a
                      href="https://maps.google.com/?q=Buddhanagar+New+Baneshwor+Kathmandu+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E3A8A] hover:underline pt-1"
                    >
                      <span>Open in Google Maps App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form with Name, Email, Phone, Subject, Service, Message */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-md space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="text-2xl font-bold font-['Outfit'] text-[#0F172A]">
                    Project Inquiry & Consultation Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Send us your project details or tender requirements. We respond promptly during standard business hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black font-['Outfit'] text-[#0F172A]">
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your inquiry regarding{' '}
                      <strong className="text-[#1E3A8A]">{formData.service}</strong> has been received by our engineering desk.
                    </p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-neutral-200 max-w-sm mx-auto text-xs text-slate-600 space-y-1 text-left">
                      <div><strong>Subject:</strong> {formData.subject || 'General Inquiry'}</div>
                      <div><strong>Phone Contact:</strong> {formData.phone}</div>
                      <div><strong>Inquiry Ref:</strong> KYOLY-{Math.floor(1000 + Math.random() * 9000)}</div>
                    </div>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            service: 'Transmission Line',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 bg-[#D6A548] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Er. Naresh Mahato"
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kyolyconstruction1@gmail.com"
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +977-9705551631"
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        />
                      </div>
                    </div>

                    {/* Subject & Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="e.g. Tender Bid / Substation Plinths"
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Service *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white font-medium"
                        >
                          <option value="Transmission Line">Transmission Line (66kV - 400kV)</option>
                          <option value="Substation & Switchyard">Substation & Switchyard</option>
                          <option value="Residential Building Design">Residential Building Design</option>
                          <option value="Commercial Building Design">Commercial Building Design</option>
                          <option value="Civil Construction">Civil Construction</option>
                          <option value="Designing & Estimation">Designing & Estimation</option>
                          <option value="General Inquiry">General Engineering Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe project scope, site location, timeline, structural specifications, or tender deadlines..."
                        className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#25D366] font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Prefer WhatsApp instant chat? Click here</span>
                      </a>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
