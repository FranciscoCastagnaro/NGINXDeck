/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0a0f1c",      // Fondo principal (muy oscuro, casi negro con azul)
        secondary: "#121826",    // Contenedores / tarjetas
        accent: "#1e40af",       // Azul marino acento (botones, tabs activos)
        muted: "#1f2937",        // Grises oscuros para bordes o separadores
        textPrimary: "#ffffff",
        textSecondary: "#9ca3af", // Gris claro para textos secundarios
      },
    },
  },
  plugins: [],
};
