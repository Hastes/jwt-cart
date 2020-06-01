import jwt from 'jwt-simple';


const JWT_CART_ITEMS_KEY = 'JWT_CART_ITEMS';

class JwtCart {
  
  constructor(jwtKey) {
    this._items = {};

    this._observersOnAdd = [];
    this._observersOnRemove = [];
  
    this.jwtKey = jwtKey;

    this.init();
  }

  get items() {
    return Object.values(this._items);
  }

  set items(val) {
    const serializedItems = JSON.stringify(val);
    localStorage.setItem(JWT_CART_ITEMS_KEY, serializedItems);
  }

  get token() {
    const token = jwt.encode(this._items, this.jwtKey);
    return token;
  }

  init() {
    try {
      const items = localStorage.getItem(JWT_CART_ITEMS_KEY);
      if (items) this._items = JSON.parse(items);
    }
    catch {
      throw new Error("Jwt cart can't initialized try to clear cache")
    }
  }

  bindItems() {
    const forms = document.getElementsByClassName('jwt-cart-item');
    for (const form of forms) {
      form.addEventListener('submit', (e) => onAddItemSubmit(e, this));
      const item = this._items[form.id.value];

      if (item) {
        this._observersOnAdd.map(callback => callback(form, true, item, this.items));
      };
    }
  }

  addItem(item, form = null) {
    this._items[item.id] = item;
    this.items = Object.assign({}, this._items)

    this._observersOnAdd.map(callback => callback(form, false, item, this.items));
  }

  removeItem(item, form = null) {
    delete this._items[item.id];
    this.items = Object.assign({}, this._items)

    this._observersOnRemove.map(callback => callback(form, item, this.items));
  }

  clearAll() {
    // Full clear cart
    this._items =  {};
    this.items = {};
  }

  onAdd(callback) {
    // Subscribe on add
    this._observersOnAdd.push(callback);
  }

  onRemove(callback) {
    // Subscribe on remove
    this._observersOnRemove.push(callback);
  }

}

function onAddItemSubmit(e, instance) {
  // Activate when forms with class name "jwt-cart-item" submited
  // it's toggle item in cart 
  e.preventDefault();
  const item = Object.fromEntries(new FormData(e.target));
  instance._items[item.id] ? instance.removeItem(item, e.target) : instance.addItem(item, e.target);
}

export default JwtCart;