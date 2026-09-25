// This is Sadhix Institute
const express = require('express');
const path = require('path');
const mysql = require('mysql');
// Run express server
const app = express();
const PORT = 3000; // You can change the port if needed
// Establishing a connection with the database
const connection = mysql.createConnection({
  host: '172.31.0.129',
  user: 'root',
  password: 'Password@1234',
  database: 'sadhixdb'
});
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database.");
});
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
// Root route - shows plain text banner with header
app.get('/', (req, res) => {
    res.send('<h1>Students Portal</h1><p>This is Sadhix Institute</p>');
});
// API Endpoint to Fetch User Details
app.get("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID." });
    }
    const sqlQuery = `SELECT * FROM USER_INFO WHERE id = ?`;
    connection.query(sqlQuery, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed." });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json(result[0]);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
