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
    res.json({ tables: tableNames });
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
      supplierID: item.supplierID,
      currentStorage: item.currentStorage,
      maxStorage: item.maxStorage,
      price: item.price,
      lowStorage: item.lowStorage,
      zeroStorage: item.zeroStorage,
    }));

    res.json({ inventory });
  });
});

app.post("/inventory-update", (req, res) => {
  const { inventoryID, quantity } = req.body;
  const sqlUpdate = "UPDATE inventory SET currentStorage = currentStorage + ? WHERE ID = ?";

  db.query(sqlUpdate, [quantity, inventoryID], (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating inventory:", updateError);
      res.status(500).json({ error: "Error updating inventory" });
    } else {
      res.status(200).json({
        message: "Inventory updated successfully",
        inventoryID,
        newQuantity: quantity, // Assuming you want to return the new quantity
      });
    }
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

    res.json({ orders });
  });
});

app.post("/orders-insert", (req, res) => {
  const { customerID, orderDate, totalOwed, totalPaid, paymentType } = req.body;
  const sql =
    "INSERT INTO orders (customerID, orderDate, totalOwed, totalPaid, paymentType) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [customerID, orderDate, totalOwed, totalPaid, paymentType],
    (error, results) => {
      if (error) {
        console.error("Error inserting into orders:", error);
        res.status(500).json({ error: "Error inserting into orders" });
      } else {
        // Return the inserted row data (including the auto-generated orderID)
        const insertedOrder = {
          orderID: results.insertId,
          customerID,
          orderDate,
          totalOwed,
          totalPaid,
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

app.get("/orderitems", (req, res) => {
  db.query("SELECT * FROM orderitems", (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      res.status(500).send("Error in database query");
      return;
    }

    const orderItems = results.map((item) => ({
      ID: item.ID,
      orderID: item.orderID,
      inventoryID: item.inventoryID,
      quantity: item.quantity,
    }));

    res.json({ orderItems });
  });
});

app.post("/orderitems-insert", (req, res) => {
  const { orderID, inventoryID, quantity } = req.body;
  const sql =
    "INSERT INTO orderitems (orderID, inventoryID, quantity) VALUES (?, ?, ?)";

  db.query(sql, [orderID, inventoryID, quantity], (error, results) => {
    if (error) {
      console.error("Error inserting into orderitems:", error);
      res.status(500).json({ error: "Error inserting into orderitems" });
    } else {
      // Return the inserted row data
      const insertedItem = {
        orderID,
        inventoryID,
        quantity,
      };
      res
        .status(200)
        .json({ message: "Item inserted successfully", item: insertedItem });
    }
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

    res.json({ orders });
  });
});



app.post('/employee-login', (req, res) => {
  const { ID, checkPassword } = req.body;

  const sql = 'SELECT * FROM Employees WHERE ID = ?';

  db.query(sql, ID, (error, results) => {
    if (error) {
      console.error('Error checking login credentials:', error);
      res.status(500).json({ error: 'Error checking login credentials' });
    } else {
      if (results.length > 0) {
        const employee = results[0];
        // Compare the entered password with the one stored in the database
        if (checkPassword === employee.Password) {
          res.status(200).json({ success: true, message: 'Login successful', ...employee });
        } else {
          res.status(401).json({ success: false, message: `Incorrect Password ${checkPassword} expected ${employee.Password}` });
        }
      } else {
        res.status(404).json({ message: `Employee with ID ${ID} not found` });
      }
    }
  });
});


app.post("/check-phone-num", (req, res) => {
  const { phoneNumber } = req.body;
  const sql = "SELECT ID, fName, lName FROM customers WHERE phone_num = ?";

  db.query(sql, [phoneNumber], (error, results) => {
    if (error) {
      console.error("Error checking phone number:", error);
      res.status(500).json({ error: "Error checking phone number" });
    } else {
      // Check if any results were returned (indicating the phone number exists)
      const phoneNumberExists = results.length > 0;

      if (phoneNumberExists) {
        const { ID, fName, lName } = results[0];
        res
          .status(200)
          .json({ message: "Phone number exists", ID, fName, lName });
      } else {
        res.status(404).json({ message: "Phone number not found" });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
