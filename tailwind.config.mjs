/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        // Primary blue: Professional blue shades for main content
        neutral: {
          50: '#eff6ff',   // Very light blue for containers
          100: '#dbeafe',  // Light blue alternative
          200: '#bfdbfe',  // Slightly darker light blue
          300: '#93c5fd',  // Medium light blue
          400: '#60a5fa',  // Medium blue
          500: '#3b82f6',  // Standard blue
          600: '#2563eb',  // Darker blue
          700: '#1d4ed8',  // Dark blue for text
          800: '#1e40af',  // Very dark blue for text
          900: '#1e3a8a',  // Darkest blue for primary text
          950: '#172554',  // Darkest blue for maximum contrast
        },
        // Secondary accent: Slate-blue for subtle accents
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['2.75rem', { lineHeight: '1.1' }],
        '6xl': ['3.25rem', { lineHeight: '1.1' }],
        '7xl': ['3.75rem', { lineHeight: '1.0' }],
      },
      spacing: {
        '18': '4rem',
        '88': '20rem',
        '128': '28rem',
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
