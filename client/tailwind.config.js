/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        navy: "#101828",
        primary: "#FF385C",
        primarySoft: "#FFF1F3",
        muted: "#667085",
        surface: "#F7F8FA",
        line: "#EAECF0",
        success: "#12B76A",
        successSoft: "#ECFDF3",
        warning: "#F79009",
        warningSoft: "#FFFAEB",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
