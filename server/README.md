# **Fancy Todo**

## REST API documentation for CRUD, the _Fancy Todo_ application

`.env`
```
JWT_PRIVATE_KEY=secret
```

### CREATE

---

Builds a new model instance and calls save on it.

- **URL:**
  `/todo`
- **Method:**
  `POST`
- **Request Header:**

  ```json
  {
    "token": "<your access token>"
  }
  ```
  
- **Request Body:**

	| Attribute  	| Type 				| Attribute |
	| ----------- | ----------- |	----------|
	| title      	| string      |	required					|
	| description | Text        | optional	|
	| due_date    | Text        |	required					|

- **Example:**

  ```json
  {
    "title": "Task1",
    "description": "Do something",
    "due_date": "2020-08-17"
  }
  ```

- **Responses:**

  **Code:** `201` <br />
  **Content:**

  ```json
  {
    "todo": {
        "id": 1,
        "title": "task1",
        "description": "do something",
        "due_date": "2020-08-17",
        "UserId": 1,
        "updatedAt": "2020-08-04T18:08:28.704Z",
        "createdAt": "2020-08-04T18:08:28.704Z",
        "status": false
    }
  }
  ```

  **Code:** `400` <br />
  **Content:**
  |Attribute |Validation | Message
  |--- |--- |--- |--- |
  |title |if empty |`Title is required`|
  |date |if not a date |`The field data must be a date`|
  |date |if past date |`Date entered must be on or after today`|

  **Code:** `401` <br />
  **Content:** `'authorization failed'`
	
	**Code:** `500` <br />
	**Content:** `'internal server error'`

<br />

### READ

---

Search for multiple instances.

- **URL:**
  `/todo`
- **Method:**
  `GET`
- **Request Header:**

  ```json
  {
    "token": "<your access token>"
  }
  ```
- **Responses:**

  **Code:** `200` <br />
  **Content:**
  ```json
  {
    "todo": [
      {
        "id": 1,
        "title": "task1",
        "description": "do something",
        "status": false,
        "due_date": "2020-08-17",
        "UserId": 1,
        "createdAt": "2020-08-04T18:08:28.704Z",
        "updatedAt": "2020-08-04T18:08:28.704Z"
      },
      {
        "id": 2,
        "title": "Task2",
        "description": "Do more thing",
        "status": false,
        "due_date": "2020-08-17",
        "UserId": 1,
        "createdAt": "2020-08-04T18:11:37.958Z",
        "updatedAt": "2020-08-04T18:11:37.958Z"
      }
      {...},
      {...},
      {...},

    ]
  }
  ```

  **Code:** `401` <br />
  **Content:** `'authorization failed'`

	**Code:** `500` <br />
	**Content:** `'internal server error'`

<br />

### UPDATE

---

Update instances that match the where options.

- **URL:**
  `/todo/:id`
- **Method:**
  `PUT`
- **Request Header:**
  ```json
  {
    "token": "<your access token>"
  }
  ```

- **Request Params:** `:id`=[INTEGER, REQUIRED]

- **Request Body:**

	| Attribute  	| Type 				| Attribute |
	| ----------- | ----------- |	----------|
	| title      	| string      |	required	|
	| description | Text        | optional	|
	| due_date    | Text        |	required	|

- **Example:**
	*:id = `1`*

 ```json
  {
    "title": "Task3",
    "description": "Don't do something",
    "due_date": "2020-10-10"
  }
  ```

- **Responses:**

  **Code:** `200` <br />
  **Content:**

  ```json
  {
    "todo": {
      "id": 1,
      "title": "Task3",
      "description": "Don't do something",
      "status": false,
      "due_date": "2020-10-10",
      "UserId": 1,
      "createdAt": "2020-08-04T18:08:28.704Z",
      "updatedAt": "2020-08-04T18:29:43.660Z"
    }
  }
  ```

  **Code:** `400` <br />
  **Content:**
  |Attribute |Validation | Message
  |--- |--- |--- |--- |
  |ID |if doesn't exists |`Data is not found`|
  |title |if empty |`Title is required`|
  |date |if not a date |`The field data must be a date`|
  |date |if past date |`Date entered must be on or after today`|

  **Code:** `401` <br />
  **Content:** `'authorization failed'`

	**Code:** `500` <br />
	**Content:** `'internal server error'`

<br />

### DELETE

---

Delete multiple instances.

- **URL:**
  `/todo/:id`
- **Method:**
  `DELETE`
- **Request Header:**
  ```json
  {
    "token": "<your access token>"
  }
  ```
- **Request Params:** `:id`=[INTEGER, REQUIRED]

- **Responses:**

  **Code:** `200` <br />
  **Content:** 
  ```json
  {
    "msg": "data has been deleted"
  }
  ```

  **Code:** `400` <br />
  **Content:**
	|Attribute |Validation | Message
	|--- |--- |--- |--- |
	|ID |if doesn't exists |`Data is not found`|

  **Code:** `401` <br />
  **Content:** `'authorization failed'`

	**Code:** `500` <br />
	**Content:** `'internal server error'`

<br />
