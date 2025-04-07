module.exports = {
    content: ["./src/**/*.{html,js,njk,md}"],
    theme: {
      extend: {
        colors: {
          primary: "#28E0CC",
          secondary: "#326F78",
          dark: "#174247",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        borderRadius: {
          '3xl': '1.5rem',
        }
      },
    },
    plugins: [],
  };