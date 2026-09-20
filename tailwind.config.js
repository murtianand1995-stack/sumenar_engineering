 /** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D19',
          900: '#0A1830',
          800: '#0F2440',
          700: '#173355',
        },
        steel: {
          600: '#2E5B8A',
          500: '#3E76AC',
          400: '#5C93C7',
          300: '#8FB4D9',
        },
        metal: {
          100: '#F2F4F7',
          200: '#E4E8EE',
          300: '#CBD3DD',
          400: '#AEB8C4',
          500: '#7E8A99',
        },
        forge: {
          600: '#B8451F',
          500: '#D8562A',
          400: '#E8703E',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.75rem',  // buttons, form panels, generic cards — was a near-square 2px
        lg: '1.25rem',  // photos, hero images, product panels — soft & premium
      },
      boxShadow: {
        panel: '0 14px 34px -16px rgba(6, 13, 25, 0.18)',
        image: '0 10px 26px -14px rgba(6, 13, 25, 0.14)',
      },
      backgroundImage: {
        'field-lines': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 20 Q60 0 120 20'/%3E%3Cpath d='M0 50 Q60 30 120 50'/%3E%3Cpath d='M0 80 Q60 60 120 80'/%3E%3Cpath d='M0 110 Q60 90 120 110'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}