import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hd-orange-400': '#EF4800',
        'hd-orange-500': '#d74000',
        'hd-blue-400': '#D9F2FF',
        'hd-blue-500': '#c3d9e5',
        'hd-blue-600': '#67CFEC',
        'hd-blue-700': '#61A6C3',
        'hd-darkblue-400': '#454F5F',
        'hd-darkblue-500': '#3e4755',
        'hd-darkblue-600': '#373f4c',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
