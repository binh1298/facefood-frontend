import { LOCALSTORAGE_TOKEN_NAME } from '../configurations';
import jwt_decode from 'jwt-decode'
class LocalStorageUtils {
  getItem(key, defaultValue = '\"\"') {
    if (typeof localStorage !== 'undefined') {
      let item = localStorage.getItem(key);
      if (item && item === 'undefined') item = defaultValue;
      return JSON.parse(item);
    }
    return undefined;
  }

  setItem(key, value = "") {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  getUser() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getItem(LOCALSTORAGE_TOKEN_NAME);
      console.log('gegege', token);
      if (token) return jwt_decode(token);
      else return token; 
    }
    return undefined
  }
}

export default new LocalStorageUtils();