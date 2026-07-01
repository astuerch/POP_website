import type {Config} from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          paper: "#F8F5FC",
          sand: "#EDE4F5",
          coral: "#B6A1D2",
          ink: "#1A0F2E",
          slate: "#6B5B8A",
          mint: "#D4C7EC",
          lila: "#B6A1D2",
          lilaDark: "#3A2D52",
          dark: "#0A0A0A",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        card: "0 24px 80px -32px rgba(26, 15, 46, 0.25)",
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(circle at top, rgba(182,161,210,0.24), transparent 45%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
