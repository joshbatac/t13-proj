require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  connectionLimit: 10,
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Checking if the pool is valid
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
  connection.release();
});

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.get("/", (req, res) => {
  db.query("SHOW TABLES", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    const tableNames = results.map((row) => Object.values(row)[0]);
    res.json({
      tables: tableNames
    });
  });
});


app.get("/inventory", (req, res) => {
  db.query("SELECT * FROM inventory", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }

    const inventory = results.map((item) => ({
      ID: item.ID,
      name: item.name,
      currentStorage: item.currentStorage,
      maxStorage: item.maxStorage,
      price: item.price,
      buyPrice: item.buyPrice,
      lowStorage: item.lowStorage,
      zeroStorage: item.zeroStorage,
      supplierID: item.supplierID
    }));

    res.json({
      inventory
    });
  });
});


app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      orders: results
    });
  });
});

app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM suppliers", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      suppliers: results
    });
  });
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      customers: results
    });
  });
});


app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM suppliers", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      suppliers: results
    });
  });
});


app.get("/storeinfo", (req, res) => {
  db.query("SELECT * FROM storeinfo", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      storeInfo: results
    });
  });
});




app.get("/orderitems", (req, res) => {
  db.query("SELECT * FROM orderitems", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }

    res.json({
      orderItems: results
    });
  });
});


app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    const orders = results.map((item) => ({
      ID: item.ID,
      CustomerID: item.CustomerID,
      orderDate: item.orderDate,
      totalOwed: item.totalOwed,
      totalPaid: item.totalPaid,
      paymentType: item.paymentType,
    }));

    res.json({
      orders
    });
  });
});


app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }

    res.json({
      employees: results
    });
  });
});

app.get("/roles", (req, res) => {
  db.query("SELECT * FROM roles", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }
    res.json({
      roles: results
    });
  });
});

app.get('/customer-orders', (req, res) => {
  const {
    startDate,
    endDate,
    customerId
  } = req.query; // Extract customer ID from the request query

  // Validate startDate, endDate, and customerId presence
  if (!startDate || !endDate || !customerId) {
    res.status(400).json({
      error: 'Invalid parameters. Please provide startDate, endDate, and customerId.'
    });
    return;
  }

  // Define the SQL query with GROUP_CONCAT to concatenate products
  const query = `
    SELECT
      o.ID as orderID,
      o.orderDate,
      o.totalOwed,
      c.fName as customerFirstName,
      c.lName as customerLastName,
      GROUP_CONCAT(CONCAT(i.name, ' (', oi.quantity, ' units)') SEPARATOR ', ') as products,
      SUM(o.totalOwed) as totalAmount
    FROM orders o
    JOIN orderitems oi ON o.ID = oi.orderID
    LEFT JOIN customers c ON o.customerID = c.ID
    LEFT JOIN inventory i ON oi.inventoryID = i.ID
    WHERE o.orderDate BETWEEN ? AND ?
      AND c.ID = ?  
    GROUP BY o.ID
  `;

  // Execute the SQL query
  db.query(query, [startDate, endDate, customerId], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      // Send the response back to the client
      res.json(results);
    }
  });
});

app.get('/emp-orders', (req, res) => {
  const {
    startDate,
    endDate
  } = req.query;

  // Validate startDate and endDate presence
  if (!startDate || !endDate) {
    res.status(400).json({
      error: 'Invalid parameters. Please provide startDate and endDate.'
    });
    return;
  }

  // Define the SQL query with GROUP_CONCAT to concatenate products
  const query = `
  SELECT
  o.ID as orderID,
  o.orderDate,
  o.totalOwed,
  c.fName as customerFirstName,
  c.lName as customerLastName,
  GROUP_CONCAT(CONCAT(i.name, ' (', oi.quantity, ' units)') SEPARATOR ', ') as products,
  SUM(oi.quantity * i.price) as totalAmount
FROM
  orders o
JOIN
  orderitems oi ON o.ID = oi.orderID
LEFT JOIN
  customers c ON o.customerID = c.ID
LEFT JOIN
  inventory i ON oi.inventoryID = i.ID
  WHERE o.orderDate BETWEEN ? AND ?
GROUP BY
  o.ID;

  `;

  // Execute the SQL query
  db.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      // Send the response back to the client
      res.json(results);
    }
  });
});

app.get('/product-report', (req, res) => {
  const {
    startDate,
    endDate
  } = req.query;

  // Validate startDate and endDate presence
  if (!startDate || !endDate) {
    res.status(400).json({
      error: 'Invalid parameters. Please provide startDate and endDate.'
    });
    return;
  }

  // Define the SQL query to get product purchase frequency and total quantity purchased
  const query = `
  SELECT
  i.name AS ProductName,
  SUM(oi.quantity) AS TotalQuantitySold,
  SUM(i.price * oi.quantity) AS TotalProfit
FROM
  inventory i
LEFT JOIN
  orderitems oi ON i.ID = oi.inventoryID
JOIN
  orders o ON oi.orderID = o.ID
WHERE
  o.orderDate BETWEEN ? AND ?
GROUP BY
  i.ID, i.name
ORDER BY
  TotalProfit DESC;
  `;

  // Execute the SQL query
  db.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      // Send the response back to the client
      res.json(results);
    }
  });
});

app.get('/supplier-report', (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate startDate and endDate presence
  if (!startDate || !endDate) {
    res.status(400).json({
      error: 'Invalid parameters. Please provide startDate and endDate.'
    });
    return;
  }

  // Define the SQL query to get supplier-wise profit and quantity sold
  const query = `
  SELECT
  s.name AS SupplierName,
  GROUP_CONCAT(DISTINCT i.name ORDER BY i.name ASC) AS SuppliedInventory,
  SUM(oi.quantity) AS TotalQuantitySold,
  SUM(i.price * oi.quantity - i.buyPrice * oi.quantity) AS TotalProfit
FROM
  suppliers s
LEFT JOIN
  inventory i ON s.ID = i.supplierID
LEFT JOIN
  orderitems oi ON i.ID = oi.inventoryID
LEFT JOIN
  orders o ON oi.orderID = o.ID
WHERE
  o.orderDate BETWEEN ? AND ?
GROUP BY
  s.ID, s.name
ORDER BY
  TotalProfit DESC;

  `;

  // Execute the SQL query
  db.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    } else {
      // Send the response back to the client
      res.json(results);
    }
  });
});


app.post("/customer-update", (req, res) => {
  const {
    customerID,
    newFName,
    newLName,
    newPhone
  } = req.body;

  // Assuming your table is named 'customers'
  const sqlUpdate = "UPDATE customers SET fName = ?, lName = ?, phone_num = ? WHERE ID = ?";

  db.query(sqlUpdate, [newFName, newLName, newPhone, customerID], (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating customer:", updateError);
      res.status(500).json({
        error: "Error updating customer"
      });
    } else {
      res.status(200).json({
        message: "Customer updated successfully",
        customerID,
        newFName,
        newLName,
        newPhone,
      });
    }
  });
});

app.post("/employee-update", (req, res) => {
  const {
    ID,
    newFName,
    newLName,
    newPhone,
    newEmail
  } = req.body;

  const sqlUpdate = "UPDATE employees SET FirstName = ?, LastName = ?, Phone = ?, Email = ? WHERE ID = ?";

  db.query(sqlUpdate, [newFName, newLName, newPhone, newEmail, ID], (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating employee:", updateError);
      res.status(500).json({
        error: "Error updating customer"
      });
    } else {
      res.status(200).json({
        message: "employee updated successfully",
        newFName,
        newLName,
        newPhone,
        newEmail
      });
    }
  });
});

app.post("/inventory-update", (req, res) => {
  const {
    inventoryID,
    quantity
  } = req.body;
  const sqlUpdate = "UPDATE inventory SET currentStorage = currentStorage + ? WHERE ID = ?";

  db.query(sqlUpdate, [quantity, inventoryID], (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating inventory:", updateError);
      res.status(500).json({
        error: "Error updating inventory"
      });
    } else {
      res.status(200).json({
        message: "Inventory updated successfully",
        inventoryID,
        newQuantity: quantity, // Assuming you want to return the new quantity
      });
    }
  });
});

app.put("/storeinfo-update", (req, res) => {
  const {
    storeID,
    newStoreName,
    newDescription,
    newContactEmail,
    newContactPhone
  } = req.body;

  const sqlUpdate = "UPDATE storeInfo SET store_name = ?, description = ?, contact_email = ?, contact_phone = ? WHERE store_id = ?";

  db.query(sqlUpdate, [newStoreName, newDescription, newContactEmail, newContactPhone, storeID], (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating store information:", updateError);
      res.status(500).json({
        error: "Error updating store information"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Store information updated successfully",
        storeID,
        newStoreName,
        newDescription,
        newContactEmail,
        newContactPhone,
      });
    }
  });
});


app.post("/orders-insert", (req, res) => {
  const {
    customerID,
    orderDate,
    totalOwed,
    paymentType
  } = req.body;
  const sql =
    "INSERT INTO orders (customerID, orderDate, totalOwed, paymentType) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [customerID, orderDate, totalOwed, paymentType],
    (error, results) => {
      if (error) {
        console.error("Error inserting into orders:", error);
        res.status(500).json({
          error: "Error inserting into orders"
        });
      } else {
        // Return the inserted row data (including the auto-generated orderID)
        const insertedOrder = {
          orderID: results.insertId,
          customerID,
          orderDate,
          totalOwed,
          paymentType,
        };
        res.status(200).json({
          message: "Order inserted successfully",
          order: insertedOrder,
        });
      }
    }
  );
});

app.post("/orderitems-insert", (req, res) => {
  const {
    orderID,
    inventoryID,
    quantity
  } = req.body;
  const sql =
    "INSERT INTO orderitems (orderID, inventoryID, quantity) VALUES (?, ?, ?)";

  db.query(sql, [orderID, inventoryID, quantity], (error, results) => {
    if (error) {
      console.error("Error inserting into orderitems:", error);
      res.status(500).json({
        error: "Error inserting into orderitems"
      });
    } else {
      // Return the inserted row data
      const insertedItem = {
        orderID,
        inventoryID,
        quantity,
      };
      res
        .status(200)
        .json({
          message: "Item inserted successfully",
          item: insertedItem
        });
    }
  });
});


app.post('/employee-login', (req, res) => {
  const {
    ID,
    checkPassword
  } = req.body;

  const sql = 'SELECT * FROM Employees WHERE ID = ?';

  db.query(sql, ID, (error, results) => {
    if (error) {
      console.error('Error checking login credentials:', error);
      res.status(500).json({
        error: 'Error checking login credentials'
      });
    } else {
      if (results.length > 0) {
        const employee = results[0];
        // Compare the entered password with the one stored in the database
        if (checkPassword === employee.Password) {
          res.status(200).json({
            success: true,
            message: 'Login successful',
            ...employee
          });
        } else {
          res.status(401).json({
            success: false,
            message: `Incorrect Password ${checkPassword} expected ${employee.Password}`
          });
        }
      } else {
        res.status(404).json({
          message: `Employee with ID ${ID} not found`
        });
      }
    }
  });
});

app.post("/check-phone-num", (req, res) => {
  const {
    phoneNumber
  } = req.body;
  const sql = "SELECT ID, fName, lName FROM customers WHERE phone_num = ?";

  db.query(sql, [phoneNumber], (error, results) => {
    if (error) {
      console.error("Error checking phone number:", error);
      res.status(500).json({
        error: "Error checking phone number"
      });
    } else {
      // Check if any results were returned (indicating the phone number exists)
      const phoneNumberExists = results.length > 0;

      if (phoneNumberExists) {
        const {
          ID,
          fName,
          lName
        } = results[0];
        res
          .status(200)
          .json({
            message: "Phone number exists",
            ID,
            fName,
            lName
          });
      } else {
        res.status(404).json({
          message: "Phone number not found"
        });
      }
    }
  });
});

app.post("/customer-insert", (req, res) => {
  const {
    fName,
    lName,
    phone_num
  } = req.body;
  const sql =
    "INSERT INTO customers (fName, lName, phone_num) VALUES (?, ?, ?)";

  db.query(
    sql,
    [fName, lName, phone_num],
    (error, results) => {
      if (error) {
        console.error("Error inserting into customers:", error);
        res.status(500).json({
          error: "Error inserting into customers"
        });
      } else {
        // Return the inserted row data (including the auto-generated ID)
        const insertedCustomer = {
          ID: results.insertId,
          fName,
          lName,
          phone_num,
        };
        res.status(200).json({
          message: "Customer added successfully",
          customer: insertedCustomer,
        });
      }
    }
  );
});

app.post("/inventory-add", (req, res) => {
  const {
    name,
    price,
    buyPrice,
    currentStorage,
    maxStorage,
    supplierID
  } = req.body;
  const sqlInsert = "INSERT INTO inventory (name, price, buyPrice, currentStorage, maxStorage, supplierID) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sqlInsert, [name, price, buyPrice, currentStorage, maxStorage, supplierID], (insertError, insertResults) => {
    if (insertError) {
      console.error("Error adding item to inventory:", insertError);
      res.status(500).json({
        error: "Error adding item to inventory"
      });
    } else {
      // Return the inserted row data (including the auto-generated ID)
      const insertedItem = {
        ID: insertResults.insertId,
        name,
        price,
        buyPrice,
        currentStorage,
        maxStorage,
        supplierID
      };
      res.status(200).json({
        success: true,
        message: "Item added to inventory successfully",
        item: insertedItem,
      });
    }
  });
});

app.delete("/inventory-delete/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const sqlDelete = "DELETE FROM inventory WHERE ID = ?";

  db.query(sqlDelete, [itemId], (deleteError, deleteResults) => {
    if (deleteError) {
      console.error("Error removing item from inventory:", deleteError);
      res.status(500).json({
        error: "Error removing item from inventory"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Item removed from inventory successfully",
        itemId,
      });
    }
  });
});

app.post("/employees-add", (req, res) => {
  const {
    FirstName,
    LastName,
    RoleID,
    Email,
    Phone,
    Password
  } = req.body;
  const sqlInsert = "INSERT INTO employees (FirstName, LastName,RoleID, Email, Phone, Password) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sqlInsert, [FirstName, LastName, RoleID, Email, Phone, Password], (insertError, insertResults) => {
    if (insertError) {
      console.error("Error adding employee:", insertError);
      res.status(500).json({
        error: "Error adding employee"
      });
    } else {
      // Return the inserted row data (including the auto-generated ID)
      const insertedEmployee = {
        ID: insertResults.insertId,
        FirstName,
        LastName,
        RoleID,
        Email,
        Phone,
        Password
      };
      res.status(200).json({
        success: true,
        message: "Employee added successfully",
        employee: insertedEmployee,
      });
    }
  });
});

app.delete("/employees-delete/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const sqlDelete = "DELETE FROM employees WHERE ID = ?";

  db.query(sqlDelete, [employeeId], (deleteError, deleteResults) => {
    if (deleteError) {
      console.error("Error removing employee:", deleteError);
      res.status(500).json({
        error: "Error removing employee"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Employee removed successfully",
        employeeId,
      });
    }
  });
});

app.post("/customers-add", (req, res) => {
  const {
    fName,
    lName,
    phone_num
  } = req.body;
  const sqlInsert = "INSERT INTO customers (fName, lName, phone_num) VALUES (?, ?, ?)";

  db.query(sqlInsert, [fName, lName, phone_num], (insertError, insertResults) => {
    if (insertError) {
      console.error("Error adding customer:", insertError);
      res.status(500).json({
        error: "Error adding customer"
      });
    } else {
      // Return the inserted row data (including the auto-generated ID)
      const insertedCustomer = {
        ID: insertResults.insertId,
        fName,
        lName,
        phone_num,
      };
      res.status(200).json({
        success: true,
        message: "Customer added successfully",
        customer: insertedCustomer,
      });
    }
  });
});

app.delete("/customers-delete/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  const sqlDelete = "DELETE FROM customers WHERE ID = ?";

  db.query(sqlDelete, [customerId], (deleteError, deleteResults) => {
    if (deleteError) {
      console.error("Error removing customer:", deleteError);
      res.status(500).json({
        error: "Error removing customer"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Customer removed successfully",
        customerId,
      });
    }
  });
});

app.post("/suppliers-add", (req, res) => {
  const { name } = req.body;
  const sqlInsert = "INSERT INTO suppliers (name) VALUES (?)";

  db.query(sqlInsert, [name], (insertError, insertResults) => {
    if (insertError) {
      console.error("Error adding supplier:", insertError);
      res.status(500).json({
        error: "Error adding supplier"
      });
    } else {
      // Return the inserted row data (including the auto-generated ID)
      const insertedSupplier = {
        ID: insertResults.insertId,
        name
      };
      res.status(200).json({
        success: true,
        message: "Supplier added successfully",
        supplier: insertedSupplier,
      });
    }
  });
});

app.delete("/suppliers-delete/:supplierId", (req, res) => {
  const supplierId = req.params.supplierId;
  const sqlDelete = "DELETE FROM suppliers WHERE ID = ?";

  db.query(sqlDelete, [supplierId], (deleteError, deleteResults) => {
    if (deleteError) {
      console.error("Error removing supplier:", deleteError);
      res.status(500).json({
        error: "Error removing supplier"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Supplier removed successfully",
        supplierId,
      });
    }
  });
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
