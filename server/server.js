const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
app.use(express.json());
app.use(cors());


const connection=mysql.createConnection(`mysql://avnadmin:AVNS_N5lxsXZu9l3KKMxHbvg@mysql-1e01fdda-anshalinsharu-549b.a.aivencloud.com:20374/employee`);


connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});


app.post('/submit', (req, res) => {
    console.log(req.body)
    const { name, empid, department, dob, gender, designation, salary, address } = req.body;
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

app.listen(8080)