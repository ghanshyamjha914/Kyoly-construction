import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [hasModalOpen, setHasModalOpen] = useState(false);
  const waUrl = getWhatsAppUrl();

  // Hide the floating WhatsApp button whenever ANY modal or dialog is open in the application
  useEffect(() => {
    const checkModals = () => {
      // Check for any modal overlay present in DOM
      const modalElements = document.querySelectorAll(
        '.fixed.inset-0, [role="dialog"], [aria-modal="true"]'
      );
      setHasModalOpen(modalElements.length > 0);
    };

    checkModals();

    const observer = new MutationObserver(() => {
      checkModals();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'role'],
    });

    return () => observer.disconnect();
  }, []);

  // Do not display the floating WhatsApp widget if any modal, document editor, or dialog is active
  if (hasModalOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 select-none group">
      {/* Tooltip ONLY visible on direct hover without blocking any page content */}
      <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900/90 text-white rounded-full shadow-md text-[11px] font-medium tracking-wide whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
        <span>WhatsApp</span>
      </div>

      {/* Sleek, compact WhatsApp button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Kyoly Construction"
        className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="currentColor"
          className="relative"
        >
          <path d="M12.031 2C6.516 2 2.025 6.49 2.025 12c0 1.954.567 3.774 1.543 5.316L2 22l4.834-1.53c1.478.887 3.208 1.402 5.067 1.402h.005c5.514 0 10.005-4.49 10.005-10 0-5.511-4.49-10-9.88-10zm0 18.232h-.004c-1.637 0-3.167-.45-4.48-1.233l-.322-.191-3.327 1.053 1.077-3.238-.21-.334c-.878-1.396-1.341-3.024-1.341-4.707 0-4.664 3.795-8.459 8.608-8.459 4.811 0 8.604 3.795 8.604 8.459 0 4.665-3.792 8.65-8.605 8.65zm4.721-6.474c-.259-.13-1.531-.756-1.768-.842-.238-.087-.41-.13-.583.13-.173.259-.669.842-.821 1.015-.151.173-.303.195-.562.065-.259-.13-1.095-.404-2.086-1.288-.771-.688-1.292-1.538-1.443-1.797-.151-.26-.016-.4.113-.529.117-.117.26-.303.389-.455.13-.151.173-.259.259-.432.087-.173.043-.325-.022-.455-.065-.13-.583-1.406-.8-1.928-.211-.508-.426-.439-.583-.447l-.497-.009c-.173 0-.454.065-.691.325-.238.259-.908.887-.908 2.162s.93 2.508 1.06 2.681c.13.173 1.83 2.795 4.433 3.92.619.268 1.103.428 1.48.548.622.198 1.189.17 1.637.103.499-.075 1.531-.626 1.747-1.231.216-.605.216-1.124.151-1.231-.064-.108-.237-.173-.496-.303z" />
        </svg>
      </a>
    </div>
  );
};
