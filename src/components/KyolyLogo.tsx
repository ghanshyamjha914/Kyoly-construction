import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import originalLogoPng from '../assets/images/kyoly-original-logo.png';

interface KyolyLogoProps {
  variant?: 'light' | 'dark' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
  showTagline?: boolean;
  customSrc?: string | null;
  logoType?: 'circular' | 'gold' | 'vector';
  imgStyle?: React.CSSProperties;
}

export const KyolyLogo: React.FC<KyolyLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  customSrc = siteConfig.customLogoUrl || originalLogoPng,
  imgStyle,
}) => {
  const [imageError, setImageError] = useState(false);
  const isDarkBg = variant === 'dark';

  useEffect(() => {
    setImageError(false);
  }, [customSrc]);

  // Dimension scaling for the complete original Skyline logo PNG (3:2 aspect ratio)
  const sizeClasses = {
    sm: 'h-11 sm:h-12 w-auto',
    md: 'h-14 sm:h-16 md:h-20 w-auto',
    lg: 'h-20 sm:h-24 md:h-28 w-auto',
    xl: 'h-28 sm:h-32 md:h-36 w-auto',
  };

  const logoImageSrc = customSrc || originalLogoPng || '/kyoly-logo.png';

  return (
    <div
      className={`inline-flex items-center transition-transform duration-200 hover:opacity-95 ${className} ${
        isDarkBg ? 'bg-white p-1.5 sm:p-2 rounded-xl shadow-sm border border-neutral-200/50' : ''
      }`}
    >
      {!imageError ? (
        <img
          src={logoImageSrc}
          alt="Kyoly Construction Pvt. Ltd. Official Skyline Logo"
          style={imgStyle}
          className={`${imgStyle ? '' : sizeClasses[size]} object-contain select-none`}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Vector Fallback of the Skyline Logo */
        <svg
          viewBox="0 0 600 400"
          className={`${sizeClasses[size]} object-contain`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Skyline Buildings */}
          <polygon points="190,140 235,115 235,210 190,210" fill="#FF7A00" />
          <polygon points="235,115 255,128 255,200 235,210" fill="#CC4400" />
          <polygon points="260,95 305,75 305,170 260,170" fill="#FF7A00" />
          <polygon points="305,75 325,88 325,160 305,170" fill="#CC4400" />
          <polygon points="348,105 385,125 385,205 348,190" fill="#2B333E" />
          <polygon points="325,135 255,185 270,185 325,146 380,185 395,185" fill="#2B333E" />
          <polygon points="325,148 275,185 375,185" fill="#2B333E" />
          <path
            d="M140,210 Q250,170 340,202 Q390,220 440,205 C400,216 350,212 310,200 Q230,175 140,210 Z"
            fill="#FF7A00"
          />
          {/* Typography */}
          <path d="M80,240 H108 V285 H132 L158,240 H192 L148,295 L196,350 H160 L126,308 L108,328 V350 H80 Z" fill="#2B333E" />
          <path d="M124,306 L160,350 H196 L146,293 Z" fill="#FF6B00" />
          <path d="M192,240 H220 L246,290 L272,240 H300 L260,305 V350 H232 V305 Z" fill="#2B333E" />
          <path
            d="M365,237 C395,237 415,260 415,295 C415,330 395,353 365,353 C335,353 315,330 315,295 C315,260 335,237 365,237 Z
               M365,265 C350,265 342,277 342,295 C342,313 350,325 365,325 C380,325 388,313 388,295 C388,277 380,265 365,265 Z"
            fill="#2B333E"
            fillRule="evenodd"
          />
          <path d="M430,240 H458 V324 H505 V350 H430 Z" fill="#2B333E" />
          <path d="M400,240 H428 L454,290 L480,240 H508 L468,305 V350 H440 V305 Z" fill="#2B333E" />
          <text
            x="300"
            y="380"
            textAnchor="middle"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="28"
            letterSpacing="5"
            fill="#2B333E"
          >
            CONSTRUCTION PVT. LTD.
          </text>
        </svg>
      )}
    </div>
  );
};
