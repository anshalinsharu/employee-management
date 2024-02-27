const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors middleware

const app = express();
const port = 8080;

// MySQL connection
// const connection = mysql.createConnection({
//     host: 'mysql-1e01fdda-anshalinsharu-549b.a.aivencloud.com',
//     user: 'avnadmin',
//     password: 'AVNS_N5lxsXZu9l3KKMxHbvg',
//     database: 'employee'
// });


const connection=mysql.createConnection(`mysql://avnadmin:AVNS_N5lxsXZu9l3KKMxHbvg@mysql-1e01fdda-anshalinsharu-549b.a.aivencloud.com:20374/defaultdb?ssl-mode=REQUIRED`);

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, empid, department, dob, gender, designation, salary, address } = req.body;

    // Insert data into MySQL
    const query = `INSERT INTO employeedb (name, empid, department, dob, gender, designation, salary,address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
    connection.query(query, [name, empid, department, dob, gender, designation, salary,address], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL: ', err);
            res.status(500).send('Error submitting data');
            return;
        }
        console.log(req.body);
        console.log('Data inserted successfully');
        res.status(200).send('Data submitted successfully');
    });
});

app.get('/',(req,res)=>{
    const query = `SELECT * FROM employeedb`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching data');
        }
        return res.status(200).send(result);
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});