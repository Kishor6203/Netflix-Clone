export function saveStorage(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }
  
  export function getStorage(key, defaultValue = []) {
    try {
      const data = localStorage.getItem(key);
  
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }
  
  export function removeStorage(key) {
    localStorage.removeItem(key);
  }