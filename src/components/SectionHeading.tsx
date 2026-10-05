import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  alignment = 'left',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto' : ''} ${className}`}>
      {/* Kicker */}
      {kicker && (
        <div className={`flex items-center gap-2 mb-2 ${isCenter ? 'justify-center' : ''}`}>
          <span className="w-4 h-0.5 bg-[#F4511E]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D6A548]">
            {kicker}
          </span>
          {isCenter && <span className="w-4 h-0.5 bg-[#F4511E]" />}
        </div>
      )}

      {/* Main Title Row with subtle gold horizontal line and light gray engineering-inspired diagonal pattern beside each heading */}
      <div className={`flex items-center gap-4 ${isCenter ? 'justify-center' : ''}`}>
        {isCenter && (
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[120px] justify-end">
            <div className="w-12 h-3 engineering-diagonal-pattern rounded-sm border border-[#D6A548]/30" />
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#D6A548]" />
          </div>
        )}

        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-[#202124]'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {/* Beside heading: Subtle gold horizontal line + light gray engineering diagonal pattern */}
        <div className={`flex items-center gap-2 ${isCenter ? 'max-w-[120px] flex-1' : 'flex-1 max-w-xs'}`}>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-[#D6A548] to-[#D6A548]/40" />
          <div className="w-12 h-3.5 engineering-diagonal-pattern rounded-sm border border-[#D6A548]/30 shrink-0" />
        </div>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg max-w-2xl ${
            isDark ? 'text-neutral-400' : 'text-[#5F6368]'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
