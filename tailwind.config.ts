/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "13-Medium": [
          "1.3rem",
          {
            fontWeight: 500,
            lineHeight: "3.5rem",
          },
        ],
        "13-SemiBold": [
          "1.3rem",
          {
            fontWeight: 600,
            lineHeight: "3.5rem",
          },
        ],
        "14-Medium": [
          "1.4rem",
          {
            fontWeight: 500,
            lineHeight: "3.5rem",
          },
        ],
        "14-SemiBold": [
          "1.4rem",
          {
            fontWeight: 600,
            lineHeight: "3.5rem",
          },
        ],
        "16-Medium": [
          "1.6rem",
          {
            fontWeight: 500,
            lineHeight: "3.5rem",
          },
        ],
        "16-Bold": [
          "1.6rem",
          {
            fontWeight: 700,
            lineHeight: "3.5rem",
          },
        ],
        "16-ExtraBold": [
          "1.6rem",
          {
            fontWeight: 800,
            lineHeight: "3.5rem",
          },
        ],
        "18-SemiBold": [
          "1.8rem",
          {
            fontWeight: 600,
            lineHeight: "3.5rem",
          },
        ],
        "20-SemiBold": [
          "2rem",
          {
            fontWeight: 600,
            lineHeight: "3.5rem",
          },
        ],
        "20-Bold": [
          "2rem",
          {
            fontWeight: 700,
            lineHeight: "3.5rem",
          },
        ],
        "24-Bold": [
          "2.4rem",
          {
            fontWeight: 700,
            lineHeight: "3.5rem",
          },
        ],
      },
    },
  },
  plugins: [],
};
