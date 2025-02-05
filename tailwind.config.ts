import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor:{
        appGreen:"#92981B",
        appGray:'#837676',
      },
      backgroundColor:{
        appGreen:"#92981B",
        appGray:'#837676',
      },
      ringColor:{
        appGreen:"#92981B",
        appGray:'#837676',
      },
      borderColor:{
        appGreen:"#92981B",
        appGray:'#837676',
      },fontFamily:{
        poppinsRegular:['var(--font-poppinsRegular-400)'],
        poppinsBold: ['var(--font-poppins-bold)'],
        poppinsLight:['var(--font-poppins-light)']
      }
    },
  },
  darkMode: "class",
  plugins: [
    flowbite.plugin(),
    nextui()
  ],
};
export default config;
