import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'oklch(0.141 0.005 285.823)',
          secondary: 'oklch(0.21 0.006 285.885)',
          glass: 'oklch(0.21 0.006 285.885 / 0.5)',
        },
        foreground: {
          DEFAULT: 'oklch(0.985 0 0)',
          secondary: 'oklch(0.92 0.004 286.32)',
        },
        primary: {
          DEFAULT: 'oklch(0.7 0.19 276.75)',
          foreground: 'oklch(0.985 0 0)',
        },
        secondary: {
          DEFAULT: 'oklch(0.274 0.006 286.033)',
          foreground: 'oklch(0.985 0 0)',
        },
        accent: {
          DEFAULT: 'oklch(0.7 0.14 189.25)',
          foreground: 'oklch(0.985 0 0)',
        },
        muted: {
          DEFAULT: 'oklch(0.21 0.006 285.885)',
          foreground: 'oklch(0.705 0.015 286.067)',
        },
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px oklch(0.7 0.19 276.75 / 0.5)' },
          '100%': { boxShadow: '0 0 20px oklch(0.7 0.19 276.75 / 0.8)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;