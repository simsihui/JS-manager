/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      animation: {
        "slide-up": "slide-up 0.5s ease-in-out",
        "slide-down": "slide-down 0.5s ease-in-out",
        "slide-left": "slide-left 0.5s ease-in-out",
        "slide-right": "slide-right 0.5s ease-in-out",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(20%)" },
          "80%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20%)" },
          "80%": { transform: "translateY(10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(50%)" },
          "80%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-50%)" },
          "80%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
