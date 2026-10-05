import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Building2, Zap, Shield, FileText } from 'lucide-react';
import { KyolyLogo } from './KyolyLogo';
import { siteConfig } from '../config/siteConfig';
import modalLogoImg from '../assets/images/kyoly-original-logo.png';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Transmission Lines',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    organization: '',
    serviceCategory: initialService,
    projectLocation: '',
    estimatedBudget: 'Over 50 Lakhs NPR',
    timeline: 'Immediate (Within 1-3 months)',
    projectDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#171717] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#D6A548]">
          <div className="flex items-center gap-3">
            <KyolyLogo variant="dark" size="md" showSubtitle={false} customSrc={modalLogoImg} />
            <div>
              <h3 className="text-base font-bold font-['Outfit'] tracking-wide text-white">
                Request Engineering & Construction Quote
              </h3>
              <p className="text-[11px] text-neutral-400">
                Kyoly Construction Pvt. Ltd. · Technical Advisory & Cost Estimation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#202124] font-['Outfit']">
                Quote Request Received!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our senior estimation engineer will review your project requirements for{' '}
                <span className="text-[#F4511E] font-semibold">{formData.serviceCategory}</span> in {formData.projectLocation || 'Nepal'} and call you back shortly.
              </p>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 max-w-md mx-auto text-left space-y-1.5 text-xs text-neutral-600">
                <div><strong>Inquiry Reference:</strong> KYOLY-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div><strong>Direct Engineering Hotline:</strong> <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#F4511E] font-bold">{siteConfig.phoneDisplay}</a></div>
                <div><strong>Response Window:</strong> Within 4 business hours</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#D6A548] hover:bg-[#c99539] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Er. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +977-9705551631"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Company / Organization / Authority
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. NEA / Commercial Developer"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Service Scope *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548] bg-white font-medium"
                  >
                    <option value="Transmission Lines">Transmission Lines (66kV - 400kV)</option>
                    <option value="Substation & Switchyard">Substation & Switchyard Engineering</option>
                    <option value="Distribution Lines">Electrical Distribution Infrastructure</option>
                    <option value="Building Construction">Commercial & Residential Building Construction</option>
                    <option value="Civil Construction">Civil Infrastructure (Bridges, Roads, Culverts)</option>
                    <option value="MEP Systems">MEP & HVAC Systems Integration</option>
                    <option value="Commercial Electrification">Commercial Electrification</option>
                    <option value="Design & Estimation">Structural Design, Survey & Cost Estimation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                    Project Site Location in Nepal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    placeholder="e.g. Lalitpur / Janakpur / Pokhara / Terai"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-1">
                  Project Description & Specifications
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Outline your project scope, capacity, line length, structure floor area, or preliminary BOQ details..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#D6A548] focus:border-[#D6A548]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-[11px] text-neutral-500">
                  Prefer direct call?{' '}
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#F4511E] font-bold">
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#D6A548] hover:bg-[#c99539] text-[#171717] font-extrabold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
