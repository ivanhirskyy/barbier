import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#feffe7',
          100: '#fbffc1',
          200: '#fcff86',
          300: '#fffc41',
          400: '#ffee0e',
          500: '#fddf01', //base
          600: '#d0a600',
          700: '#a67702',
          800: '#895d0a',
          900: '#744c0f',
          950: '#442804',
        },
        secondary: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#666666',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        white: '#ffffff',
        black: '#000000',
        success: '#4CAF50',
        error: '#F44336',
      },
      boxShadow: {
        logo: '0 0 12px 0px',
      },
    },
    fontFamily: {
      arial: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      system: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    },
  },
};
