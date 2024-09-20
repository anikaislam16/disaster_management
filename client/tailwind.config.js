/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure it scans React components for class names
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI as a Tailwind plugin
}
