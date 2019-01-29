# e-commerce

### Below are the URLs and the operations associated with them.
---
| Method | URL | Description | Parameter | 
| ------ | ------ | ------ | ------ | 
| POST | ````/users/register```` | Sign up with new user info | [body.email], [body.password]| 
| POST | ```/users/login``` | Sign in while get an access token based on credentials | [body.email], [body.password] |
| GET | ````/products```` | Get all the products | [headers.token] |
| POST | ````/products```` | Create new product | [headers.token], [body.name], [body.description], [body.price], [body.stock], [body.imageUrl] |
| PUT | ````/products/:id```` | Update a product| [headers.token], [params.id], [body.name], [body.description], [body.price], [body.stock], [body.imageUrl] | 
| DELETE | ````/products/:id```` | Delete a product| [headers.token], [params.id] | 

* **URL:**  
/users/register
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        email: string,
        password: string,
        source: string
    }`
    ````
 * **Error Response:**
    * **Code:** 500
    * **Content:** `{
        message: err.message
    }`
 ***

 * **URL:**  
/users/login
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
      token: string
    }`
    ````
 * **Error Response:**
    * **Code:** 500
    * **Content:** `{
      message: err.message
    }`
 ***

 * **URL:**  
/products
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        id: ObjectId,
        name: string,
        description: string,
        price: number, 
        stock: number,
        imageUrl: string
    }`
    ````
 * **Error Response:**
    * **Code:** 500
    * **Content:** `{
        message: err.message
    }`
 ***
  * **URL:**  
/products/:id
* **Method:**
`PUT`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: string
    }`
    ````
 * **Error Response:**
    * **Code:** 500
    * **Content:** `{
        message: err.message
    }`
 ***
 * **URL:**  
/products/:id
* **Method:**
`DELETE`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: string
    }`
    ````
 * **Error Response:**
    * **Code:** 500
    * **Content:** `{
        message: err.message
    }`
 ***