import jwt from 'jwt-simple';


const JWT_CART_ITEMS_KEY = 'JWT_CART_ITEMS';

class JwtCart {
  
  constructor(jwtKey) {
    this._items = {};

    this._observerOnAdd = () => {};
    this._observerOnRemove = () => {};
    this._observerOnBind = () => {};
    this._observerOnChange = () => {};
  
    this.jwtKey = jwtKey;

    this.init();
  }

  get items() {
    return Object.values(this._items);
  }

  set items(val) {
    const serializedItems = JSON.stringify(val);
    localStorage.setItem(JWT_CART_ITEMS_KEY, serializedItems);
    this._observerOnChange(val);
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
        this._observerOnBind(form, item, this.items);
      };
    }
  }

  addItem(item, form = null) {
    this._items[item.id] = item;
    this.items = Object.assign({}, this._items)

    this._observerOnAdd(form, item, this.items);
  }

  removeItem(item, form = null) {
    delete this._items[item.id];
    this.items = Object.assign({}, this._items)

    this._observerOnRemove(form, item, this.items);
  }

  clearAll() {
    // Full clear cart
    this._items =  {};
    this.items = {};
  }

  onAdd(callback) {
    // Subscribe on add
    this._observerOnAdd = callback;
  }

  onRemove(callback) {
    // Subscribe on remove
    this._observerOnRemove = callback;
  }

  onBind(callback) {
    // Subscribe on bind
    this._observerOnBind = callback;
  }

  onItemsChange(callback) {
    // Subscribe on set items
    this._observerOnChange = callback;
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
