import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      lavender: {
        50: "#f0f2fd",
        100: "#e4e7fb",
        200: "#ced2f7",
        300: "#b1b6f0",
        400: "#a0a0eb",
        500: "#7e76de",
        600: "#6d5ccf",
        700: "#5e4cb6",
        800: "#4d4093",
        900: "#413976",
        950: "#272244",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
