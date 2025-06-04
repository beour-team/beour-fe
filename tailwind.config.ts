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
          },
        ],
        "13-SemiBold": [
          "1.3rem",
          {
            fontWeight: 600,
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
    },
  },
  plugins: [],
};
