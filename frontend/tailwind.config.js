/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        surface: 'oklch(var(--surface) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.15)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.15)',
        'glow-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #a855f7, #3b82f6)',
        'gradient-primary-hover': 'linear-gradient(135deg, #9333ea, #2563eb)',
        'gradient-surface': 'linear-gradient(135deg, rgba(168,85,247,0.05), rgba(59,130,246,0.05))',
        'gradient-card': 'linear-gradient(135deg, oklch(0.13 0.018 270), oklch(0.15 0.025 280))',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        filmGrain: {
          '0%':   { backgroundPosition: '0% 0%' },
          '10%':  { backgroundPosition: '-5% -10%' },
          '20%':  { backgroundPosition: '-15% 5%' },
          '30%':  { backgroundPosition: '7% -20%' },
          '40%':  { backgroundPosition: '-20% 10%' },
          '50%':  { backgroundPosition: '15% -5%' },
          '60%':  { backgroundPosition: '-10% 20%' },
          '70%':  { backgroundPosition: '20% -15%' },
          '80%':  { backgroundPosition: '-5% 10%' },
          '90%':  { backgroundPosition: '10% -8%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        colorGrade: {
          '0%': {
            background:
              'linear-gradient(160deg, rgba(0,40,80,0.65) 0%, rgba(0,20,50,0.45) 40%, rgba(10,5,30,0.40) 70%, rgba(0,10,40,0.50) 100%)',
          },
          '50%': {
            background:
              'linear-gradient(160deg, rgba(10,10,30,0.50) 0%, rgba(5,5,20,0.35) 40%, rgba(30,15,5,0.45) 70%, rgba(60,30,0,0.50) 100%)',
          },
          '100%': {
            background:
              'linear-gradient(160deg, rgba(0,40,80,0.65) 0%, rgba(0,20,50,0.45) 40%, rgba(10,5,30,0.40) 70%, rgba(0,10,40,0.50) 100%)',
          },
        },
        scanLine: {
          '0%':   { top: '-2%', opacity: '0.7' },
          '10%':  { opacity: '0.9' },
          '90%':  { opacity: '0.6' },
          '100%': { top: '102%', opacity: '0' },
        },
        focusPulse: {
          '0%':   { transform: 'scale(1.000)' },
          '25%':  { transform: 'scale(1.002)' },
          '50%':  { transform: 'scale(1.003)' },
          '75%':  { transform: 'scale(1.002)' },
          '100%': { transform: 'scale(1.000)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        filmGrain: 'filmGrain 0.5s steps(10) infinite',
        colorGrade: 'colorGrade 6s ease-in-out infinite',
        scanLine: 'scanLine 3s linear infinite',
        focusPulse: 'focusPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
