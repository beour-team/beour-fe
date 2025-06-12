import daisyui from "daisyui";
import lineClamp from "@tailwindcss/line-clamp";
import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "12-Medium": [
          "1.2rem",
          {
            fontWeight: 500,
          },
        ],
        "13-Medium": [
          "1.3rem",
          {
            fontWeight: 500,
          },
        ],
        "13-SemiBold": [
          "1.3rem",
          {
            fontWeight: 600,
          },
        ],
        "13-Bold": [
          "1.3rem",
          {
            fontWeight: 700,
          },
        ],
        "14-Medium": [
          "1.4rem",
          {
            fontWeight: 500,
          },
        ],
        "14-SemiBold": [
          "1.4rem",
          {
            fontWeight: 600,
          },
        ],
        "16-Medium": [
          "1.6rem",
          {
            fontWeight: 500,
          },
        ],
        "16-SemiBold": [
          "1.6rem",
          {
            fontWeight: 600,
          },
        ],
        "16-Bold": [
          "1.6rem",
          {
            fontWeight: 700,
          },
        ],
        "16-ExtraBold": [
          "1.6rem",
          {
            fontWeight: 800,
          },
        ],
        "18-SemiBold": [
          "1.8rem",
          {
            fontWeight: 600,
          },
        ],
        "18-ExtraBold": [
          "1.8rem",
          {
            fontWeight: 800,
          },
        ],
        "20-SemiBold": [
          "2rem",
          {
            fontWeight: 600,
          },
        ],
        "20-Bold": [
          "2rem",
          {
            fontWeight: 700,
          },
        ],
        "24-Bold": [
          "2.4rem",
          {
            fontWeight: 700,
          },
        ],
      },
      colors: {
        "cr-white": "#FFFFFF",
        "cr-100": "#F3F5F9",
        "cr-200": "#E9ECF2",
        "cr-300": "#DCE1E9",
        "cr-400": "#C2C7D1",
        "cr-500": "#9296A1",
        "cr-600": "#656A76",
        "cr-700": "#474953",
        "cr-800": "#2A2C32",
        "cr-900": "#212328",
        "cr-primary": "#D3DFFD",
        "cr-red": "#FF5757",
        "cr-pink": "#FFCDD3",
        "cr-blue": "#6B96F9",
        "cr-yellow": "#FFCC00",
      },
    },
  },
  plugins: [daisyui, lineClamp, scrollbarHide],
};
