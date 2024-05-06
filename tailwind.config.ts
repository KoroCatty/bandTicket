import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        'fit-content': 'fit-content'
      },
      margin: {
        'section-sm': '2rem', 
        'section-md': '6rem', 
        'section-lg': '8rem', 
      },
      backgroundColor: {
        "AccentBg": "#b490ab",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Freight: ["freight-display-pro", "STKaiti", "essonnes-display", 'serif'],
        Zen_kaku: ["__Zen_Kaku_Gothic_New_2a6e8c", "sans-serif"],
      },
      textShadow: {
        white: '0 0 10px rgba(255, 255, 255, 0.8)'
      }
    },
  },
  plugins: [],
};
export default config;
