import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // El Charret custom colors
        charret: {
          brown: "hsl(var(--charret-brown))",
          "brown-light": "hsl(var(--charret-brown-light))",
          cream: "hsl(var(--charret-cream))",
          "cream-dark": "hsl(var(--charret-cream-dark))",
          gold: "hsl(var(--charret-gold))",
          "gold-light": "hsl(var(--charret-gold-light))",
          black: "hsl(var(--charret-black))",
          white: "hsl(var(--charret-white))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        // Custom animations for logo intro
        "logo-reveal-slow": {
          "0%": { opacity: "0", transform: "scale(0.8) rotate(-10deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "logo-wheel-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "logo-shatter": {
          "0%": { opacity: "1", transform: "scale(1) rotate(0deg) blur(0px)" },
          "50%": { opacity: "0.5", transform: "scale(1.05) rotate(5deg) blur(2px)" },
          "100%": { opacity: "0", transform: "scale(0.7) rotate(-15deg) blur(5px)" },
        },
        "page-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "split-left-open": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0", visibility: "hidden" },
        },
        "split-right-open": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0", visibility: "hidden" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out forwards", // Adjusted duration for food background
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        // Custom animations for logo intro
        "logo-reveal-slow": "logo-reveal-slow 2.5s ease-out forwards",
        "logo-wheel-spin": "logo-wheel-spin 3s linear infinite", // Will be controlled by JS
        "logo-shatter": "logo-shatter 0.4s ease-in forwards",
        "page-fade-in": "page-fade-in 1s ease-out forwards",
        "split-left-open": "split-left-open 0.8s ease-in-out forwards",
        "split-right-open": "split-right-open 0.8s ease-in-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(to bottom, rgba(61, 40, 23, 0.7), rgba(61, 40, 23, 0.9))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;