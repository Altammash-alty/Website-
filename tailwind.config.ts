import { filter } from "framer-motion/client";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primaryOrange: 'rgb(249, 115 ,22)',
  			border: '#fff'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-x': 'linear-gradient(to right, #ff00ff, #00ff00, #0000ff, #ff0000, #ff00ff)'
  		},
  		animation: {
  			blob: 'blob 7s infinite',
  			'spin-slow': 'spin 20s linear infinite',
  			'bounce-slow': 'bounce 3s infinite',
  			float: 'float 6s ease-in-out infinite',
  			appear: 'appear 0 ease-in-out',
  			'gradient-x': 'gradient-x 5s ease infinite',
  			'rotateCircle': 'rotate 4s ease infinite',
  			'text-gradient': 'text-gradient 4s ease infinite',
  			'border-gradient': 'border-gradient 4s ease infinite',
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
  		},
  		keyframes: {
  			'text-gradient': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'border-gradient': {
  				'0%, 100%': {
  					'border-image-source': 'linear-gradient(to right, #00f260, #0575e6)',
  					'border-image-slice': '1'
  				},
  				'50%': {
  					'border-image-source': 'linear-gradient(to right, #0575e6, #00f260)',
  					'border-image-slice': '1'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'rotate': {
  				'0%': {
  					transform: 'rotateZ(0deg)'
  				},
  				'100%': {
  					transform: 'rotateZ(360deg)'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)'
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			appear: {
  				from: {
  					opacity: '0',
  					filter: 'blur(4px)'
  				},
  				to: {
  					opacity: '1',
  					filter: 'blue(0px)'
  				}
  			},
  			'shimmer-slide': {
  				to: {
  					transform: 'translate(calc(100cqw - 100%), 0)'
  				}
  			},
  			'spin-around': {
  				'0%': {
  					transform: 'translateZ(0) rotate(0)'
  				},
  				'15%, 35%': {
  					transform: 'translateZ(0) rotate(90deg)'
  				},
  				'65%, 85%': {
  					transform: 'translateZ(0) rotate(270deg)'
  				},
  				'100%': {
  					transform: 'translateZ(0) rotate(360deg)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
