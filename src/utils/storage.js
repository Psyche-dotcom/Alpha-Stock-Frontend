import { deleteCookie, getCookie, setCookie } from "cookies-next";

export default class Storage {
  static set(key, value) {
    try {
      setCookie(key, String(value));
    } catch (err) {
      console.error("Error setting cookie:", err);
    }
  }

  static get(key) {
    try {
      return getCookie(key) || undefined;
    } catch (err) {
      return undefined;
    }
  }

  static setObject(key, value) {
    try {
      setCookie(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting object:", err);
    }
  }

  static getObject(key) {
    try {
      const state = getCookie(key);
      return state ? JSON.parse(state) : undefined;
    } catch (err) {
      return undefined;
    }
  }

  static clear() {
    try {
      deleteCookie(); // Clears all cookies
      localStorage.clear();
    } catch (err) {
      console.error("Error clearing storage:", err);
    }
  }

  static remove(key) {
    try {
      deleteCookie(key);
    } catch (err) {
      console.error("Error removing key:", err);
    }
  }
}
