/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        'titles': '24px',
        'label': '20px',
        'normal': '17px',
      },
      colors: {
        yellowMain: '#FFED00'
      },
      transitionProperty: {
        'background': 'background-color',
      },
      fontFamily: {
        'main':['Open Sans']
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
    },
  },
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.completed': {
        fontStyle: 'italic',
        fontWeight: 'bold',
        textDecoration: 'line-through'
      },
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
}

