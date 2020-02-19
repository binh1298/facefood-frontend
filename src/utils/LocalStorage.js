class LocalStorageUtils {
  getItem(key, defaultValue = '\"\"') {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key) || defaultValue;
      return JSON.parse(item);
    }
    return 'undefined';
  }

  setItem(key, value) {
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
}

export default new LocalStorageUtils();