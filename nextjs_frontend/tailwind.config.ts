import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js"
  ],
  plugins: [require("preline/plugin")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-NoirPro)"]
      },
      colors: {
        primary: "#f23322",
        secondary: "#0d0d0d",
        tertiary: "#e4e4e4",
        status: {
          0: "#0fa958",
          1: "#ffc700",
          2: "#ff7a00",
          3: "#ff0000"
        }
      },
      spacing: {
        "128": "32rem"
      }
    }
  }
};
export default config;
