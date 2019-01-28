# e-commerce
Link deploy:
<br>
[http://ecommerce.anharfathoni.site](http://ecommerce.anharfathoni.site)
<hr>
Test:
<br><br>
admin = admin@mail.com
password = 1234

user = user1@mail.com
password = 1234
<hr>

### home page (open in browser)
```
http://localhost:8080
```

# REST-API 🔥
***
## Register
***
sign up with new user info
1. URL  `http://localhost:3000/register`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"name": "anhar",
	"email": "anhar@mail.com",
	"password": "1234",
}

```
5. Success Response
```javascript
CODE : 201 (Created)

CONTENT :
{
  message: "success register, please login to continue"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  error,
  message: "error message"
}
```
***
## Sign In Using Email
***
sign in while get an access token based on credentials
1. URL  `localhost:3000/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  error,
  message: 'error message'
}
```