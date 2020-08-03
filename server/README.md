# **Fancy Todo**

## REST API documentation for CRUD, the _Fancy Todo_ application

### CREATE

---

Builds a new model instance and calls save on it.

- **URL:**
  `/todo`
- **Method:**
  `POST`
- **Body Request:**

	| Attribute  	| Type 				| Attribute |
	| ----------- | ----------- |	----------|
	| title      	| string      |						|
	| description | Text        | optional	|
	| due_date    | Text        |						|

- **Example:**

  ```json
  {
    "title": "Foo",
    "description": "Bar",
    "due_date": "2020-08-17"
  }
  ```

- **Success Response:**

  **Code:** `201` <br />
  **Content:**

  ```json
  {
    "msg": "'Foo' has been inserted"
  }
  ```

- **Error Response:**<br />
  **Code:** \_\_\_ <br />
  **Content:**
  |Attribute |Validation | Message
  |--- |--- |--- |--- |
  |title |if empty |`Title is required`|
  |date |if not a date |`The field data must be a date`|
  |date |if past date |`Date entered must be on or after today`|
	
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

- **Success Response:**

  **Code:** `200` <br />
  **Content:** Array of object data

- **Error Response:**<br />
  **Code:** \_\_\_ <br />
  **Content:**

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
- **Params Request:** `:id`
- **Body Request:**

	| Attribute  	| Type 				| Attribute |
	| ----------- | ----------- |	----------|
	| title      	| string      |						|
	| description | Text        | optional	|
	| due_date    | Text        |						|

- **Example:**
	*id : 3*

  ```json
  {
    "title": "Fo",
    "description" : "Ba",
    "due_date" : "2020-10-10"
  }
  ```

- **Success Response:**

  **Code:** `202` <br />
  **Content:**

  ```json
  {
    "msg": "'Foo' has been updated"
  }
  ```

- **Error Response:**<br />
  **Code:** \_\_\_ <br />
  **Content:**
  |Attribute |Validation | Message
  |--- |--- |--- |--- |
  |ID |if doesn't exists |`ID is not valid`|
  |title |if empty |`Title is required`|
  |date |if not a date |`The field data must be a date`|
  |date |if past date |`Date entered must be on or after today`|

	**Code:** `500` <br />
	**Content:** `'internal server error'`

### DELETE

---

Delete multiple instances.

- **URL:**
  `/todo/:id`
- **Method:**
  `DELETE`
- **Params Request:** `:id`
- **Success Response:**

  **Code:** `202` <br />
  **Content:** 
  ```json
  {
    "msg": "'Foo' has been deleted"
  }
  ```

- **Error Response:**<br />
  **Code:** \_\_\_ <br />
  **Content:**
	|Attribute |Validation | Message
	|--- |--- |--- |--- |
	|ID |if doesn't exists |`ID is not valid`|

	**Code:** `500` <br />
	**Content:** `'internal server error'`

<br />
