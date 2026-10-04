/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette d'origine NOESIS AI (extraite du site actuel)
        ink: {
          900: "#111827", // theme-color / slate très foncé
          950: "#171717", // quasi-noir (titres, texte)
        },
        // Accent violet (identité NOESIS)
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Fonds sombres teintés violet (thème dark)
        base: {
          DEFAULT: "#040308", // fond principal du site (quasi-noir)
          alt: "#0a0715", // sections alternées
        },
        night: {
          DEFAULT: "#0d0a16",
          800: "#15101f",
          700: "#1c1530",
          card: "#100c1c", // cartes
        },
        slate: {
          700: "#374151",
          600: "#4b5563",
          500: "#6b7280",
          400: "#9ca3af",
          300: "#d1d5db",
          200: "#e5e7eb",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f5f5",
          subtle: "#f3f4f6",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Poppins"', '"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,0.04), 0 8px 24px -12px rgba(17,24,39,0.12)",
        "card-hover": "0 2px 4px rgba(17,24,39,0.06), 0 24px 48px -16px rgba(17,24,39,0.18)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
