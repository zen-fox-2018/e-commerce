# e-commerce
# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#server
# server

# Doorpress
List of basic routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/register` | **POST** | `none` | `fullname: String (`**`Required`**`), email: String (`**`Required`**`), password: String (`**`Required`**`), picture_url: String` | Create a user |
| `/login` | **POST** | `none` | `email: String (`**`Required`**`), password: String (`**`Required`**`)` | Login user |


List of user routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/products` | **POST** | `none` | `name: String (`**`Required`**`), price: Number(`**`Required`**`),  image: File (`**`Required`**`)` | Post a Product |
| `/products` | **GET** | `none` | `none` | Get all Products|
| `/products:id` | **GET** | `none` | `none` | Get detail Product|
| `/products/:id` | **PUT** | `none` | `name: String (`**`Required`**`), price: Number(`**`Required`**`)|  Update Product |
| `/products/:id` | **DELETE** | `none` | `none`|  Update Product |
| `/cart/add` | **PUT** | `token` | `none`|  add to cart a Product |
| `/cart/minus` | **PUT** | `token` | `none`|  decrease quantity of Product |
| `/cart/remove` | **PUT** | `token` | `none`|  remove product from cart |
| `/cart/` | **GET** | `token` | `none`|  Get Cart |
| `/cart/checkout` | **PUT** | `token` | `none`|  Checkout cart |

## Usage

Make sure you have **Node.js** and **npm** installed in your computer, and then run these commands:
```
$ npm install
$ npm start
```