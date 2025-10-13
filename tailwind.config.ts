import type { Config } from "tailwindcss";
import aspectRatio from "@tailwindcss/aspect-ratio";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    aspectRatio,
    scrollbarHide
  ],
};

export default config;
