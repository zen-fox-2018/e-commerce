# e-commerce

Users

| METHOD | ENDPOINT | HEADERS | BODY | Response
|--|--|--|--|--|
| POST | /users | token | email, password, provinceId, cityId| email, password
| POST | /users/login | | email, password | id, email, password, provinceId, cityId, token
| GET | /users/cart/:userId | token | | _id, item(object), userId, qty
| POST | /users/cart/:userId | token | itemId | _id, item(object), userId, qty
| PATCH | /users/cart/:userId/:cartId | token | qty | _id, item(object), userId, qty
|POST | /users/ongkir | key | | courier, destination, origin | rajaongkir (object)

Products

| METHOD | ENDPOINT | HEADERS | BODY | Response
|--|--|--|--|--|
| POST | /products | token| name, price, stock, category, imageUrl, weight | _id, name, price, stock, category, imageUrl, weight
| GET | /products | token| | product list 
| GET | /products/:id | token| name, price, stock, category, imageUrl, weight | _id, name, price, stock, category, imageUrl, weight
| PUT | /products/:id | token| name, price, stock, category, imageUrl, weight | _id, name, price, stock, category, imageUrl, weight
| DELETE | /products/:id |token | | name, price, stock, category, imageUrl, weight





