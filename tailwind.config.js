module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray-light': '#36393f',
      'gray-md': '#2f3136',
      'gray-dark': '#202225',
      'gray-whiteish': '#b9bbbe',
      'blue-1': '#218ed8',
      'blue-2': '#28a0f0',
      'blue-3': '#008ff0',
    }
  },
  plugins: [],
}