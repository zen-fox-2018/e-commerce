# E-commerce

**Products Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| POST | /products|  | name (string), price (number), stock (number), createdAt (default new Date), image (string) | Create product | return New product Object | return error
| GET | /products |  | | Get All product | return All product | return error
| GET | /products/:id |  | | Get One product | return One product | return error
| PUT | /products/:id |  | name (string), price (number), stock (number), createdAt (default new Date), image (string) | Update product | return Updated product Object | return error
| DELETE | /products |  | | Delete product | return Deleted Aproduct | return error

**Users Endpoint**

| METHOD |  ENDPOINT| HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|---------|---------|---------| ---------| --------- | -- | -- |
| POST |  /users/register |  | username (string), email (string),  password (string) | Create user | return User Object | return error
| POST | /users/login |  |email (string), password (string) | Login user | return Token | return error

### Usage


Make new file `.env` With Template:

```
JWT_SECRET = YOUR-SECRET-HERE
CLOUD_BUCKET=<your-bucket-name>
GCLOUD_PROJECT=<your-project-id>
KEYFILE_PATH=<youre-keyfile-pth>
```

Run these commands:

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```