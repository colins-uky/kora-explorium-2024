import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily : {
      Lato: ['Lato', 'sans-serif'],
      Bruno: ["'Bruno Ace SC'", 'cursive'],
      mono: ['Courier New', 'Courier', 'monospace'],
    },

    colors: {
      'jet': '#343434',
      'bright': '#FBFFFE',
      'yellow': '#FFB100',
      'munsell': '#62929E',
      'cambridge': '#6BAB90',
      'amaranth': '#AF1B3F',
      'orange': '#C44900',
      'pink': '#FC6471',
      'rblack': '#222222',
      'dblack': '#181818',
      'red': '#FF0000',
      'green': '#00FF00',
      'blue': '#0000FF',
      'white': '#DFDFDF',
      'black': '#1a1a1a',
      'grey' : '#bcbcbc',
      'lgrey' : '#dddddd',
      'dgrey' : '#787c7e',
      'ukblue' : '#19468d',
      'lukblue' : '#1e8aff',
      'midnight' : '#0d3166',
      'sky' : '#9bc6ea',
      'bluegrass' : '#1e8aff',
      'beige': '#faf3dd',

    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [],
}
export default config
