const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1@Lovely',
  database:"employeedb"
  
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// API endpoints
app.get('/employee', (req, res) => {
  const sql = 'SELECT * FROM Employee';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/employee/:id', (req, res) => {
  const searchQuery = req.query.q;
  let sql = 'SELECT * FROM Employee';
  const params = [];

  if (searchQuery) {
    sql += ' WHERE Name LIKE ? OR Email LIKE ?';
    params.push(`%${searchQuery}%`);
    params.push(`%${searchQuery}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.post('/employee', (req, res) => {
  const employee = req.body;
  const sql = 'INSERT INTO Employee SET ?';
  db.query(sql, employee, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee created successfully', id: result.insertId });
  });
});

app.put('/employee/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  const sql = 'UPDATE Employee SET ? WHERE id = ?';
  db.query(sql, [employee, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee updated successfully' });
  });
});

app.delete('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Employee WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

app.delete('/employee', (req, res) => {
  const sql = 'DELETE FROM Employee';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'All employees deleted successfully' });
  });
});

app.get('/employee/search', (req, res) => {
  const name = req.query.Name;
  const sql = 'SELECT * FROM Employee WHERE name LIKE ?';
  db.query(sql, [`%${name}%`], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
