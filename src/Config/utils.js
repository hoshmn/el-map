import * as BASE_CONFIG from "./base.json";
import * as MODELLED_CONFIG from "./modelled.json";
import * as RAW_CONFIG from "./raw.json";

/**
 * Fetches the configuration for the provided mode.
 * @param {string} mode "raw" or "modelled"
 * @returns a configuration object for @hyperobjekt/react-dashboard
 */
export const getConfig = (mode = "modelled") => {
  switch (mode) {
    case "raw":
      return { ...BASE_CONFIG.default, ...RAW_CONFIG.default };
    default:
      return { ...BASE_CONFIG.default, ...MODELLED_CONFIG.default };
  }
};
