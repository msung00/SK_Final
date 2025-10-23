/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        govblue: "#1F5FBF",
        govsky: "#2D94FF",
        govbg: "#F5F7FB"
      },
      boxShadow: { soft: "0 6px 20px rgba(20,40,80,.08)" }
    }
  },
  plugins: [],
}
