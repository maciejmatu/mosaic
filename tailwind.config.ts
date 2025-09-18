import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: "#e9e8eb",
        "dark-gray": "#c4c4c4",
        dark: "#2c2c2c",
        black: "#000000",
        green: "#11c759",
        "ocean-green": "#3fe2c5",
        yellow: "#f8c032",
        violet: "#b264d2",
        pink: "#ef69b1",
        "light-yellow": "#ffc876",
        "ocean-blue": "#5cdefb",
      },
    },
  },
  plugins: [],
} satisfies Config;
