import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}", // If using Next.js App Router
  ],
  theme: {
  },
  plugins: [],
}

export default config