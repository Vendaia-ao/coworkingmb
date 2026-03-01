import React from 'react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" width="32" height="32">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.378L1.054 31.29l6.118-1.96A15.908 15.908 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.614c-.39 1.1-1.932 2.014-3.166 2.28-.846.18-1.95.324-5.668-1.218-4.76-1.972-7.822-6.798-8.06-7.114-.228-.316-1.916-2.55-1.916-4.864 0-2.314 1.212-3.45 1.644-3.924.39-.428 1.022-.624 1.628-.624.198 0 .374.01.534.018.432.018.648.042.934.72.356.844 1.222 2.986 1.33 3.204.108.218.216.516.066.814-.14.306-.264.496-.482.762-.218.264-.426.468-.644.752-.198.25-.42.518-.174.95.246.432 1.094 1.804 2.35 2.922 1.616 1.438 2.944 1.902 3.406 2.098.342.146.748.11.998-.158.318-.344.71-.914 1.11-1.478.284-.402.642-.452 1.018-.306.382.14 2.418 1.14 2.83 1.348.414.208.688.312.79.486.098.174.098 1.012-.292 2.112z" />
  </svg>
);

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/244924006984"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar via WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-100"></div>
      <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center">
        <WhatsAppIcon />
      </div>
    </a>
  );
};
