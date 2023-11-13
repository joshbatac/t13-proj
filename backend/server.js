const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createPool({
  connectionLimit: 10,
  host: "team13-point-of-sales.mysql.database.azure.com",
  user: "team13admin",
  password: "Password!",
  database: "pos",
});

// Checking if the pool is valid
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  connection.release();
});

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  db.query('SHOW TABLES', (error, results) => {
    if (error) {
      console.error('Error in query:', error);
      res.status(500).send('Error in database query');
      return;
    }
    const tableNames = results.map(row => Object.values(row)[0]);
    res.json({ tables: tableNames });
  });
});

app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (error, results) => {
    if (error) {
      console.error('Error in query:', error);
      res.status(500).send('Error in database query');
      return;
    }

    const inventory = results.map(item => ({
      ID: item.ID,
      name: item.name,
      supplierID: item.supplierID,
      currentStorage: item.currentStorage,
      maxStorage: item.maxStorage,
      price: item.price,
    }));

    res.json({ inventory });
  });
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      console.error('Error in query:', error);
      res.status(500).send('Error in database query');
      return;
    }

    const orders = results.map(item => ({
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

app.post('/orders-insert', (req, res) => {

  const { customerID, orderDate, totalOwed, totalPaid, paymentType } = req.body;
  const sql = 'INSERT INTO orders (customerID, orderDate, totalOwed, totalPaid, paymentType) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [customerID, orderDate, totalOwed, totalPaid, paymentType], (error, results) => {
    if (error) {
      console.error('Error inserting into orders:', error);
      res.status(500).json({ error: 'Error inserting into orders' });
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
      res.status(200).json({ message: 'Order inserted successfully', order: insertedOrder });
    }
  });
});

app.get('/orderitems', (req, res) => {
  db.query('SELECT * FROM orderitems', (error, results) => {
    if (error) {
      console.error('Error in query:', error);
      res.status(500).send('Error in database query');
      return;
    }

    const orderItems = results.map(item => ({
      ID: item.ID,
      orderID: item.orderID,
      inventoryID: item.inventoryID,
      quantity: item.quantity
    }));

    res.json({ orderItems });
  });
});

app.post('/orderitems-insert', (req, res) => {
  const { orderID, inventoryID, quantity } = req.body;
  const sql = 'INSERT INTO orderitems (orderID, inventoryID, quantity) VALUES (?, ?, ?)';

  db.query(sql, [orderID, inventoryID, quantity], (error, results) => {
    if (error) {
      console.error('Error inserting into orderitems:', error);
      res.status(500).json({ error: 'Error inserting into orderitems' });
    } else {
      // Return the inserted row data
      const insertedItem = {
        orderID,
        inventoryID,
        quantity,
      };
      res.status(200).json({ message: 'Item inserted successfully', item: insertedItem });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
