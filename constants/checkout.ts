/**
 * Where /order leaves the buyer's mobile number for /checkout to pick up.
 *
 * sessionStorage rather than a query param: the number is personal data and a
 * URL would carry it into analytics, referrers and browser history.
 */
export const CHECKOUT_PHONE_KEY = 'checkout_phone';
