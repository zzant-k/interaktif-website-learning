/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#25245B',
        'navy-deep': '#1A1944',
        'navy-slate': '#3B4A6B',
        'pixel-blue': '#6D9DFF',
        'sky-blue': '#A7D8FF',
        'pastel-pink': '#F6A8E8',
        lavender: '#C7B6FF',
        'light-bg': '#FFF1FC',
        'mint-pass': '#B8F5D4',
        'mint-ink': '#124D33',
        'rose-warn': '#FFD6E6',
        'rose-ink': '#7A1238',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"VT323"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0px #25245B',
        'pixel-lg': '6px 6px 0px #25245B',
        'pixel-sm': '2px 2px 0px #25245B',
      },
    },
  },
  plugins: [],
}

