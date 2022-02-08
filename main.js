
class Storage {
  constructor(key, { storageType = 'localStorage', defaultValue = [] }) {
    this.key = key;
    this.storageType = storageType;
    this.defaultValue = defaultValue;
    if (this.defaultValue) {
      localStorage.setItem(this.key, JSON.stringify(this.defaultValue));
    }
  }

  set(...rest) {
    try {
      if (this.storageType === 'sessionStorage') {
        sessionStorage.setItem(this.key, JSON.stringify(rest));
      }

      localStorage.setItem(this.key, JSON.stringify(rest));
    }
    catch (err) {
      console.log('Out of local/session storage place');
    }

  }

  get() {
    if (this.storageType === 'sessionStorage') {
      return JSON.parse(sessionStorage.getItem(this.key)) || [];
    }

    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  clear() {
    if (this.storageType === 'sessionStorage') {
      sessionStorage.removeItem(this.key);
    }

    localStorage.removeItem(this.key);
  }

  isEmpty() {
    if (this.storageType === 'sessionStorage') {
      return !(sessionStorage.getItem(this.key));
    }

    return !(localStorage.getItem(this.key));
  }
}

// 


const names = new Storage('names', { defaultValue: ['Yura', 'Sasha'] });
names.set('Misha', 'Olia', 'Maia');
console.log(names.get());
console.log(names.isEmpty());