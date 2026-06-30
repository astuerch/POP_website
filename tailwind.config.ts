import type { Config } from "tailwindcss";

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
          paper: "#fcfaf6",
          sand: "#f2e6d7",
          coral: "#ea6f51",
          ink: "#13233f",
          slate: "#5b6475",
          mint: "#d4efe7",
        },
      },
      boxShadow: {
        card: "0 24px 80px -32px rgba(19, 35, 63, 0.28)",
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(circle at top, rgba(234,111,81,0.18), transparent 45%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
