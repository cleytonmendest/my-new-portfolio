/**
 * Reads a design token (a CSS custom property declared in src/styles/tokens.css) from the
 * document root. Client-side only. Code that needs a colour as a value (a canvas, a QR code,
 * a 3D scene) must read it from here instead of hardcoding it.
 */
export function getToken(name: `--${string}`): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
