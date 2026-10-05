/**
 * Centralized Site Configuration for Kyoly Construction Pvt. Ltd.
 * All phone numbers, emails, addresses, WhatsApp links, and logo configurations
 * can be easily updated or customized here.
 */

export interface SiteConfig {
  companyName: string;
  tagline: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsAppDisplay: string;
  whatsAppRaw: string; // with +977 country code, digits only for wa.me
  whatsAppDefaultMessage: string;
  email: string;
  headOffice: string;
  regionalOffice?: string;
  facebookUrl: string;
  customLogoUrl: string | null; // Set to image path e.g. '/custom-logo.png' when user uploads a file
  registrationNumber: string;
  panNumber: string;
}

export const siteConfig: SiteConfig = {
  companyName: 'Kyoly Construction Pvt. Ltd.',
  tagline: 'Building Infrastructure. Powering Progress.',
  phoneDisplay: '+977-9705551631',
  phoneRaw: '+977-9705551631',
  whatsAppDisplay: '+977 9854055536',
  whatsAppRaw: '9779854055536',
  whatsAppDefaultMessage:
    'Hello Kyoly Construction Pvt. Ltd., I visited your website and would like to know more about your engineering and construction services. Please provide further information.',
  email: 'kyolyconstruction1@gmail.com',
  headOffice: 'Buddhanagar-10, New Baneshwor, Kathmandu, Nepal',
  facebookUrl: 'https://www.facebook.com/kyolyconstruction',
  customLogoUrl: '/kyoly-logo.png', // Official original Skyline logo PNG
  registrationNumber: '254669/077/078',
  panNumber: '609924309',
};

/**
 * Generate a WhatsApp chat URL with optional customized message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || siteConfig.whatsAppDefaultMessage);
  return `https://wa.me/${siteConfig.whatsAppRaw}?text=${text}`;
}
