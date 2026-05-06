import ReactGA from "react-ga4";

const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID is not set.");
    return;
  }
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
