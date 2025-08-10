/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // indigo-600
                secondary: '#7C3AED', // violet-600
                background: '#F9FAFB', // gray-50
                text: '#1F2937', // gray-800
                card: '#FFFFFF',
            },
            boxShadow: {
                card: '0 4px 20px rgba(0, 0, 0, 0.05)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}