/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slideUp 0.7s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      colors: {
        background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      backgroundImage: {
        'bc1': "url('/assets/image/bc1.webp')",
        'bc9': "url('/assets/image/bc9.webp')",
      }
    },
  },
  plugins: [],
};
