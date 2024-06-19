/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1e40af',
        'custom-blue-hover': '#1e3a8a',
        'custom-gray': '#f5f5f5',

        // // FYI: Beware of overwriting existing colors (key below is the name of the existed colors)
        // 'blue': '#1fb6ff',
        // 'purple': '#7e5bef',
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'yellow': '#ffc82c',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
      },
      spacing: {
        '4px': '4px',
        '8px': '8px',
      },
      borderRadius: {
        'custom': '8px',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.button-primary': {
          // FYI: You can use @apply to apply existing utility classes
          '@apply bg-custom-blue text-black px-4 py-2 rounded-custom': {},
          backgroundColor: theme('colors.custom-blue'),
          color: theme('colors.white'), // FYI: Example of overriding existing utility classes
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.custom'),
          '&:hover': {
            '@apply bg-custom-blue-hover': {},
            backgroundColor: theme('colors.custom-blue-hover'),
          },
        },
        '.button-secondary': {
          '@apply bg-custom-gray text-custom-blue px-4 py-2 rounded-custom': {},
          backgroundColor: theme('colors.custom-gray'),
          color: theme('colors.custom-blue'),
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.custom'),
          '&:hover': {
            '@apply bg-custom-blue-hover text-white': {},
            backgroundColor: theme('colors.custom-blue-hover'),
            color: theme('colors.white'),
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']); // FYI: You can add variants here (e.g. 'focus')
      // what is variants in short? Variants are different states of a utility, such as hover, focus, and active states.
      // Why do we need variants? Variants allow you to apply utilities to different states of an element.
    },
  ],
}

