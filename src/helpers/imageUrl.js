/**
 * Returns the correct image URL.
 * After the Cloudinary migration on the server, images are stored as full
 * Cloudinary URLs (e.g. https://res.cloudinary.com/...).
 * Older records may still have plain filenames — this helper handles both.
 */
const BASE_API_URL = process.env.REACT_APP_BASE_URL || 'https://looi-store-server-izvs.onrender.com';

export const getImageUrl = (imageValue, fallback = null) => {
  if (!imageValue) return fallback;
  // Already a full URL (Cloudinary or any http/https URL)
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
    return imageValue;
  }
  // Legacy: plain filename — serve from old /uploads/ route
  return `${BASE_API_URL}/uploads/${imageValue}`;
};
