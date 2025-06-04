/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-text-fade-in": {
          "0%": {
            opacity: "0",
            backgroundSize: "200% 200%",
            backgroundPosition: "100% 0",
          },
          "100%": {
            opacity: "1",
            backgroundSize: "100% 100%",
            backgroundPosition: "0 0",
          },
        },
      },
      animation: {
        heartbeat: "heartbeat 0.8s ease-in-out",
        "fade-in-up": "fade-in-up 1.2s cubic-bezier(0.4,0,0.2,1) both",
        "gradient-text-fade-in":
          "gradient-text-fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both",
      },
    },
  },
};
