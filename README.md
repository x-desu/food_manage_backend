Here is the updated markdown with all the requested endpoints for **User**, **Order**, and **Menu** schemas:

```markdown
## API Reference

### User Endpoints

#### Register a new user

```http
  POST /api/user/register
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `name`      | `string` | **Required**. User's name |
| `email`     | `string` | **Required**. User's email |
| `password`  | `string` | **Required**. User's password |

#### Request Body Example:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Response Example:
```json
{
  "userId": "123",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "message": "User registered successfully"
}
```

#### Login a user

```http
  POST /api/user/login
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `email`     | `string` | **Required**. User's email |
| `password`  | `string` | **Required**. User's password |

#### Request Body Example:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Response Example:
```json
{
  "token": "your-jwt-token-here"
}
```

#### Get authenticated user

```http
  GET /api/user/me
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `Authorization` | `string` | **Required**. JWT token in header |

#### Response Example:
```json
{
  "userId": "123",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "user",
  "image": "profilepic.jpg"
}
```

#### Logout a user

```http
  POST /api/user/logout
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `Authorization` | `string` | **Required**. JWT token in header |

#### Response Example:
```json
{
  "message": "User logged out successfully"
}
```

#### Update User Image

```http
  PUT /api/user/updateImage
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `image`     | `string` | **Required**. URL or path of the new image |

#### Request Body Example:
```json
{
  "image": "newprofilepic.jpg"
}
```

#### Response Example:
```json
{
  "message": "User image updated successfully"
}
```

#### Update User Name

```http
  PUT /api/user/updateName
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `name`      | `string` | **Required**. New name for the user |

#### Request Body Example:
```json
{
  "name": "Johnathan Doe"
}
```

#### Response Example:
```json
{
  "message": "User name updated successfully"
}
```

---

### Order Endpoints

#### Place an order

```http
  POST /api/order/checkout
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `userId`    | `string` | **Required**. User ID placing the order |
| `items`     | `array`  | **Required**. List of menu items with quantities |
| `totalAmount`| `number` | **Required**. Total price of the order |

#### Request Body Example:
```json
{
  "userId": "123",
  "items": [
    { "id": "1", "quantity": 2 },
    { "id": "2", "quantity": 1 }
  ],
  "totalAmount": 23.47
}
```

#### Response Example:
```json
{
  "orderId": "456",
  "status": "Pending",
  "items": [
    { "name": "Pizza Margherita", "quantity": 2, "price": 8.99 },
    { "name": "Caesar Salad", "quantity": 1, "price": 5.49 }
  ],
  "totalAmount": 23.47
}
```

#### Get all orders by user

```http
  GET /api/order/user/${userId}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `userId`    | `string` | **Required**. User ID to fetch orders |

#### Response Example:
```json
[
  {
    "orderId": "456",
    "status": "Pending",
    "totalAmount": 23.47,
    "items": [
      { "name": "Pizza Margherita", "quantity": 2, "price": 8.99 },
      { "name": "Caesar Salad", "quantity": 1, "price": 5.49 }
    ]
  }
]
```

#### Update order status

```http
  PUT /api/order/status/${orderId}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `orderId`   | `string` | **Required**. Order ID to update |
| `status`    | `string` | **Required**. New status for the order (e.g., "Completed", "Pending") |

#### Request Body Example:
```json
{
  "status": "Completed"
}
```

#### Response Example:
```json
{
  "message": "Order status updated successfully"
}
```

#### Get order details by orderId

```http
  GET /api/order/${orderId}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `orderId`   | `string` | **Required**. ID of the order to fetch |

#### Response Example:
```json
{
  "orderId": "456",
  "status": "Completed",
  "items": [
    { "name": "Pizza Margherita", "quantity": 2, "price": 8.99 },
    { "name": "Caesar Salad", "quantity": 1, "price": 5.49 }
  ],
  "totalAmount": 23.47
}
```

---

### Menu Endpoints

#### Get all menu items

```http
  GET /api/menu
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `api_key`   | `string` | **Required**. Your API key |

#### Response Example:
```json
[
  {
    "id": "1",
    "name": "Pizza Margherita",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "price": 8.99,
    "category": "Main Course",
    "image": "pizza.jpg",
    "stock": 20
  }
]
```

#### Get a specific menu item

```http
  GET /api/menu/${id}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `id`        | `string` | **Required**. Id of menu item to fetch |

#### Response Example:
```json
{
  "id": "1",
  "name": "Pizza Margherita",
  "description": "Classic pizza with tomato, mozzarella, and basil",
  "price": 8.99,
  "category": "Main Course",
  "image": "pizza.jpg",
  "stock": 20
}
```

#### Update a menu item (Admin only)

```http
  PUT /api/menu/${id}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `id`        | `string` | **Required**. ID of the menu item |
| `name`      | `string` | **Optional**. New name of the item |
| `price`     | `number` | **Optional**. New price of the item |
| `category`  | `string` | **Optional**. New category of the item |
| `image`     | `string` | **Optional**. New image URL of the item |
| `stock`     | `number` | **Optional**. New stock count of the item |

#### Request Body Example:
```json
{
  "name": "Pizza Margherita Updated",
  "price": 9.99,
  "stock": 15
}
```

#### Response Example:
```json
{
  "message": "Menu item updated successfully"
}
```

#### Delete a menu item (Admin only)

```http
  DELETE /api/menu/${id}
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `id`        | `string` | **Required**. ID of the menu item to delete |

#### Response Example:
```json
{
  "message": "Menu item deleted successfully"
}
```

---

## Schema Definitions

### Menu Schema

```js
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, enum: categories, required: true }
}, { timestamps: true });
```

### Order Schema

```js
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      id: { type: mongoose.Types.ObjectId, ref: 'menu', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
}, { timestamps: true });
```

### User Schema

```js
const userSchema = new mongoose.Schema({
  name: { type:

 String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});
```

---
