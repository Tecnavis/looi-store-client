// Central place for mapping color names (as stored in the DB) to hex values.
// CSS named colors are unreliable/surprising for a few names (e.g. "chocolate"
// renders as a bright orange-brown, not a deep chocolate brown), so anything
// used as a swatch anywhere in the app should resolve through here instead of
// being passed straight to backgroundColor.
export const colorHexMap = {
  red: '#e53935', blue: '#4798f3', black: '#212121',
  white: '#ffffff', green: '#139c57', yellow: '#e2b837',
  orange: '#f57c00', pink: '#e91e8c', purple: '#7b1fa2',
  maroon: '#736751', brown: '#795548', gray: '#9e9e9e',
  chocolate: '#3d2314',
  grey: '#9e9e9e', navy: '#1a237e', 'navy blue': '#1a237e',
  teal: '#00897b', mustard: '#c8941a', olive: '#6d6f1e',
  beige: '#d9c9a3', cream: '#f0e6d2', rose: '#f48fb1',
  lavender: '#b39ddb', 'sky blue': '#29b6f6',
  'light blue': '#29b6f6', 'dark green': '#1b5e20',
  ash: '#b2beb5', 'royal blue': '#1e3a8a', 'stonewash blue': '#5b7c99',
};

const LIGHT_COLORS = ['white', 'yellow', 'cream', 'beige', 'lavender', 'rose', 'ash'];

// Normalizes a raw color name from the DB (which may have inconsistent
// casing, e.g. "Chocolate" vs "chocolate") to a lookup key.
export const normalizeColorName = (name) => (name || '').trim().toLowerCase();

export const getColorHex = (name) => {
  const key = normalizeColorName(name);
  return colorHexMap[key] || key;
};

export const isLightColor = (name) => LIGHT_COLORS.includes(normalizeColorName(name));
