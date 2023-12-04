/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      xs: "420px",
      sm: "640px", // Keep sm breakpoint the same
      md: "800px", // Change md breakpoint to 800px
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "light-grey": "var(--light-grey)",
        "medium-grey": "var(--medium-grey)",
        "dark-grey": "var(--dark-grey)",
        "very-dark-grey": "var(--very-dark-grey)",
      },
      backgroundImage: {
        bacoa: "url('/src/assets/labacoa.jpg')",
        elprat: "url('/src/assets/airport.jpg')",
        barceloneta: "url('/src/assets/barceloneta.jpg')",
        citadella: "url('/src/assets/ciutadella.jpg')",
        generator: "url('/src/assets/Generator.png')",
        guell: "url('/src/assets/guell.jpg')",
        koku: "url('/src/assets/koku.jpg')",
        ramblas: "url('/src/assets/ramblas.jpg')",
        montaditos: "url('/src/assets/montaditos.jpg')",
        congracia: "url('/src/assets/congracia.jpg')",
        ciutadella: "url('/src/assets/ciutadella.jpg')",
        sagrada: "url('/src/assets/sagrada.jpeg')",
        logo: "url('/src/assets/Logo.svg')",
        user: "url('/src/assets/userimage.png')",
        barcelona: "url('/src/assets/barcelona.jpg')",
        paraty: "url('/src/assets/paraty.jpg')",
        sicilia: "url('/src/assets/sicilia.jpg')",
        amsterdam: "url('/src/assets/amsterdam.jpg')",
        fcbarcelona: "url('/src/assets/fcbarcelona.jpg')",
        macba: "url('/src/assets/macba.jpeg')",
      },
    },
  },
  plugins: [],
};
