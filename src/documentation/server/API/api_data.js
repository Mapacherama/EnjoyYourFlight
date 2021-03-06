define({ "api": [
  {
    "type": "post",
    "url": "/admin/blockUser",
    "title": "Block/unblock a user",
    "name": "BlockUser",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The seat number of the account you want to block or unblock.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "blockState",
            "description": "<p>Whether you want to block or unblock the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "body",
            "description": "<p>Defaults to true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/updateName",
    "title": "Update a seat number",
    "name": "ChangeName",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldSeat",
            "description": "<p>The seat number you'd like to change the password of.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newSeat",
            "description": "<p>The string to change the seat number to.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "body",
            "description": "<p>Defaults to true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/updatePassword",
    "title": "Update a password",
    "name": "ChangePassword",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The seat number you'd like to change the password of.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The string to change the password to.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "body",
            "description": "<p>Defaults to true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/readNotification",
    "title": "Delete a notification",
    "name": "DeleteNotification",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The message of the notification.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seatNumber",
            "description": "<p>The seat number of the user who created the notification.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/deleteUser",
    "title": "Delete a user",
    "name": "DeleteUser",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The seat number of the account you want to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "body",
            "description": "<p>Defaults to true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/getNotification",
    "title": "Retrieve all notifications",
    "name": "GetNotification",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The notification message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Seat_number",
            "description": "<p>The seat number that created the notification.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"message\":\"\",\n    \"Seat_number\":\"8a\"\n  },\n  {\n    \"message\":\"\",\n    \"Seat_number\":\"8b\"\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/getOpenOrders",
    "title": "Retrieve all open orders",
    "name": "GetOpenOrders",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "order_number",
            "description": "<p>The order number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seat_number",
            "description": "<p>The seat number of the user who placed the order.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the product in the order.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the product in the order.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>The price of the product in the order.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>The quantity of the product in the order.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"order_number\": 1,\n    \"seat_number\": \"8a\",\n    \"id\": 1,\n    \"title\": \"tea\",\n    \"price\": 200,\n    \"quantity\": 3\n  },\n  {\n    \"order_number\": 2,\n    \"seat_number\": \"8b\",\n    \"id\": 1,\n    \"title\": \"tea\",\n    \"price\": 200,\n    \"quantity\": 1\n  },\n  {\n    \"order_number\": 3,\n    \"seat_number\": \"8b\",\n    \"id\": 3,\n    \"title\": \"coffe\",\n    \"price\": 250,\n    \"quantity\": 2\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/users",
    "title": "Retrieve all user seat numbers and block states.",
    "name": "GetUsers",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seat_number",
            "description": "<p>The seat numbers.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_blocked",
            "description": "<p>Whether the user is blocked.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"seat_number\": \"8a\",\n    \"is_blocked\": 1\n  },\n  {\n    \"seat_number\": \"8b\",\n    \"is_blocked\": 0\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/isAdmin",
    "title": "Check whether a user is an admin.",
    "name": "IsAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "body",
            "description": "<p>Whether the user is an admin.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "User is an admin",
          "content": " HTTP/1.1 200 OK\n{\n  true\n}",
          "type": "json"
        },
        {
          "title": "User is not an admin",
          "content": " HTTP/1.1 200 OK\n{\n  false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/setNotification",
    "title": "Set a notification",
    "name": "SetNotification",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The message of the notification.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seatNumber",
            "description": "<p>The seat number of the user who created the notification.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/setOrder",
    "title": "Set an order status",
    "name": "SetOrder",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderNumber",
            "description": "<p>The order to change the status of.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>The status to set the order to.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/shop/allproducts",
    "title": "Retrieve all product information",
    "name": "AllProductInformation",
    "group": "Shop",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>The path to the image of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>The price of the product in cents.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>The category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>How many items of the product are in stock.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"title\": \"tea\",\n    \"description\": \"Yum\",\n    \"image\": \"/path/to/image.jpg\",\n    \"price\": 200,\n    \"category\": \"drinks\",\n    \"id\": 1,\n    \"quantity\": 30\n  },\n  {\n    \"title\": \"coffee\",\n    \"description\": \"Yum\",\n    \"image\": \"/path/to/image.jpg\",\n    \"price\": 250,\n    \"category\": \"drinks\",\n    \"id\": 2,\n    \"quantity\": 41\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "/shop/createorder",
    "title": "Create an order",
    "name": "CreateOrder",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "order",
            "description": "<p>An array of items in the order, the attributes are: &quot;id&quot; (the product ID) and &quot;quantity&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seatNumber",
            "description": "<p>The seat number that's placing the order.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderNumber",
            "description": "<p>The order number.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "endpoints/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "/shop/getlastorder",
    "title": "Retrieve the last order",
    "name": "GetLastOrder",
    "group": "Shop",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "body",
            "description": "<p>The last order number.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  5\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "/shop/getmyorder",
    "title": "Retrieve an order",
    "name": "GetMyOrder",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "seatNumber",
            "description": "<p>The seat number that you want to retrieve the latest order from.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "order_number",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seat_number",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"order_number\": 1,\n    \"seat_number\": \"8a\",\n    \"id\": 1,\n    \"title\": \"tea\",\n    \"price\": 200,\n    \"quantity\": 3\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "/shop/productinformation",
    "title": "Retrieve product information",
    "name": "ProductInformation",
    "group": "Shop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "body",
            "description": "<p>The products you want to retrieve information of.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>The path to the image of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>The price of the product in cents.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>The category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the product.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  {\n    \"title\": \"tea\",\n    \"description\": \"Yum\",\n    \"image\": \"/path/to/image.jpg\",\n    \"price\": 200,\n    \"category\": \"drinks\",\n    \"id\": 1\n  },\n  {\n    \"title\": \"coffee\",\n    \"description\": \"Yum\",\n    \"image\": \"/path/to/image.jpg\",\n    \"price\": 250,\n    \"category\": \"drinks\",\n    \"id\": 2\n  },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/shop.js",
    "groupTitle": "Shop"
  },
  {
    "type": "post",
    "url": "/stats/emptyProducts",
    "title": "Empty the product list of the shop",
    "name": "EmptyProducts",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/stats/exportProducts",
    "title": "Retrieve the current products in the shop",
    "name": "ExportProducts",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>The token which can be used to retrieve the products file from /src/assets/csv/{token}.csv.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/stats/getAllOrders",
    "title": "Retrieve all orders",
    "name": "GetAnalytics",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>The token which can be used to retrieve the orders file from /src/assets/csv/{token}.csv.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/stats/getAnal",
    "title": "Retrieve the analytics",
    "name": "GetAnalytics",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>The token which can be used to retrieve the analytics file from /src/assets/csv/{token}.csv.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/stats/importProducts",
    "title": "Import products in shop",
    "name": "ImportProducts",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>The user session.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "dataArray",
            "description": "<p>The data to import to the product selection.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"User isn't an admin.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/stats/visit",
    "title": "Visit page",
    "name": "Visit",
    "group": "Stats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>The page that has been visited.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pageData",
            "description": "<p>Extra page data if there is any.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>The user that visited the page.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "timeSpent",
            "description": "<p>The time spent on the page in milliseconds.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "endpoints/stats.js",
    "groupTitle": "Stats"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The seat number that's being logged in with.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password associated with the seat number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seat_number",
            "description": "<p>The seat number of the account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"seat_number\": \"8a\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"Wrong seat number and/or password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/passwordReset",
    "title": "Make a password reset request",
    "name": "PasswordReset",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The seat number that's requesting a password change.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "seat_number",
            "description": "<p>The seat number of the account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"seat_number\": \"8a\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Blocked user",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"This user has been blocked.\"\n}",
          "type": "json"
        },
        {
          "title": "Not registered",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"This seat number has not been registered yet.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register",
    "name": "Register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The seat number to register.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password to register the seat number with.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"reason\": \"This user has been blocked.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "endpoints/user.js",
    "groupTitle": "User"
  }
] });
