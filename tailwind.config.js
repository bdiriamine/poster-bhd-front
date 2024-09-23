/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
