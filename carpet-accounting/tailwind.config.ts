import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        'calc332': 'calc(100vw - 332px)',
        'calc232': 'calc(100vw - 232px)',
        'calc132': 'calc(100vw - 132px)',
        'calc50': 'calc(100vw - 50px)',

      },
      height: {
        'calc50': 'calc(100vh - 50px)',
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "95": "95",
        "96": "96"
      },
    },
  },
  plugins: [],
};
export default config;
