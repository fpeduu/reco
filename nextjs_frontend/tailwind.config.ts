import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-visbycf)']
      },
      colors: {
        primary: "#f23322",
        secondary: "#0d0d0d",
        tertiary: "#e4e4e4",
      }
    },
  },
  plugins: [],
}
export default config
