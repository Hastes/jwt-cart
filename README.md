# JWT Cart

![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)


JWT Cart is a lightweight library that provides cart for shopping or just storing your own cart-items

## Features

* Store all items in local storage
* Add/remove items callbacks
* Get JWT token with decoded cart items

## Installation

* Run the below command to add jwt-cart to your exisitng or new project.

```
npm install --save jwt-cart
```

or

```
yarn add jwt-cart -S
```

* Import jwt-cart into your module to start using it.

```
import JwtCart from 'jwt-cart'
```


#### Adding JwtCart to HTML page using the traditional method

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jwt-cart"></script>
```

> Files are delivered via the CDN service provided by [jsdeliver](https://www.jsdelivr.com/)

## Documentation
1. Add form to items

```html
<!-- Add item form -->
<form method="post" class="jwt-cart-item">
  <input type="hidden" name="id" value="{{ product.id }}"> <!-- This input is required! -->
  <input type="hidden" name="count" value="1">
  <button type="submit">Add item</button>
</form>
```
2. Setup Cart

```javascript
  const onItemAdded = (form, isInit, item, items) => {
    // isInit is true when item added during bind bindItems
    // your code
    // EXAMPLE: form.getElementsByTagName('button')[0].innerHTML = 'Remove product';
  }

  const onItemRemoved = (form, item, items) => {
    // your code
    // EXAMPLE: form.getElementsByTagName('button')[0].innerHTML = 'Add product';
  }

  const jwtCart = new JwtCart('my-cart');

  jwtCart.onAdd(onItemAdded);
  jwtCart.onRemove(onItemRemoved);

  // This method scan page and bind forms with class "jwt-cart-item"
  jwtCart.bindItems(); 
```


## License

MIT © [Hastes](https://github.com/hastes)
