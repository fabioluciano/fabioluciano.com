/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      // Category-specific color schemes
      colors: {
        'category': {
          'platform': {
            light: '#f97316',
            dark: '#fb923c',
            bg: 'rgba(249, 115, 22, 0.1)',
          },
          'kubernetes': {
            light: '#326ce5',
            dark: '#5b8ff9',
            bg: 'rgba(50, 108, 229, 0.1)',
          },
          'devops': {
            light: '#22c55e',
            dark: '#4ade80',
            bg: 'rgba(34, 197, 94, 0.1)',
          },
          'cloud': {
            light: '#0ea5e9',
            dark: '#38bdf8',
            bg: 'rgba(14, 165, 233, 0.1)',
          },
          'security': {
            light: '#ef4444',
            dark: '#f87171',
            bg: 'rgba(239, 68, 68, 0.1)',
          },
          'observability': {
            light: '#8b5cf6',
            dark: '#a78bfa',
            bg: 'rgba(139, 92, 246, 0.1)',
          },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 1s',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'gradient': 'gradient-shift 3s ease infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.base-content'),
            '--tw-prose-headings': theme('colors.base-content'),
            '--tw-prose-lead': theme('colors.base-content / 80%'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.base-content'),
            '--tw-prose-counters': theme('colors.base-content / 60%'),
            '--tw-prose-bullets': theme('colors.base-content / 40%'),
            '--tw-prose-hr': theme('colors.base-300'),
            '--tw-prose-quotes': theme('colors.base-content'),
            '--tw-prose-quote-borders': theme('colors.primary'),
            '--tw-prose-captions': theme('colors.base-content / 60%'),
            '--tw-prose-code': theme('colors.base-content'),
            '--tw-prose-pre-code': theme('colors.base-content'),
            '--tw-prose-pre-bg': theme('colors.base-200'),
            '--tw-prose-th-borders': theme('colors.base-300'),
            '--tw-prose-td-borders': theme('colors.base-200'),
            maxWidth: '75ch',
            a: {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: theme('colors.base-200'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            pre: {
              backgroundColor: theme('colors.base-200'),
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '600',
              marginTop: '2em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.5em',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.primary'),
              backgroundColor: theme('colors.base-200 / 50%'),
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            img: {
              borderRadius: '0.5rem',
              margin: '0 auto',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
            },
            thead: {
              backgroundColor: theme('colors.base-200'),
            },
            'thead th': {
              fontWeight: '600',
              padding: '0.75rem 1rem',
            },
            'tbody td': {
              padding: '0.75rem 1rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#3b82f6',
          'primary-content': '#ffffff',
          'secondary': '#6366f1',
          'secondary-content': '#ffffff',
          'accent': '#06b6d4',
          'accent-content': '#ffffff',
          'neutral': '#374151',
          'neutral-content': '#f3f4f6',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#e5e7eb',
          'base-content': '#1f2937',
          'info': '#3b82f6',
          'info-content': '#ffffff',
          'success': '#22c55e',
          'success-content': '#ffffff',
          'warning': '#f59e0b',
          'warning-content': '#ffffff',
          'error': '#ef4444',
          'error-content': '#ffffff',
        },
      },
      {
        dark: {
          'primary': '#60a5fa',
          'primary-content': '#0c1929',
          'secondary': '#818cf8',
          'secondary-content': '#0e0f1a',
          'accent': '#22d3ee',
          'accent-content': '#0c1a1d',
          'neutral': '#1f2937',
          'neutral-content': '#f9fafb',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          'base-content': '#f1f5f9',
          'info': '#60a5fa',
          'info-content': '#0c1929',
          'success': '#4ade80',
          'success-content': '#0d1a10',
          'warning': '#fbbf24',
          'warning-content': '#1a1505',
          'error': '#f87171',
          'error-content': '#1a0c0c',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
  },
};
