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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//test database on render
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
      ingredientID: item.ingredientID,
      ingredientName: item.ingredientName,
      currentStorage: item.currentStorage,
      maxStorage: item.maxStorage
    }));

    res.json({ inventory });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
