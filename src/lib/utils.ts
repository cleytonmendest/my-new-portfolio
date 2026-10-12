import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom font-size and radius tokens from globals.css,
// otherwise classes like `text-caption` are mistaken for text colors.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["caption", "body-sm", "body", "subheading", "heading-sm", "headline", "stat", "display"],
      radius: ["tag", "card"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
