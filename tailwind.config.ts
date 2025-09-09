import type { Config } from "tailwindcss";
import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color":"#060B27",
        "color-links":"#8F9BB7",
        "btn-color":"#6B2B7A",
        "card-color":"#0E1330 ",
        "border-color":"#282D45",
        'transparent-blue': 'rgba(21, 25, 52, 0.8)',
        'paragraph-color':"#8F9BB7",
        'main-bg-dahboard':"#081028",
        "bg-main-color":"#FF0000",
        "orange-color":"#FE9900",
      },
      boxShadow: {
        right: "10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)",
    },
      backgroundImage: {
        'text-gradient': 'linear-gradient(to bottom, #F6F6F7, #7E808F)',
        'gradient-custom': 'linear-gradient(to right, #yourCardColor 30%, #yourMainColor 70%)',
     
      },
      textColor: {
        'transparent-gradient': 'transparent',
      },
    },
  },
  plugins: [
    lineClamp,
  ],
} satisfies Config;
