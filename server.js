const express = require("express");

const cors = require("cors");

const mysql = require("mysql");


const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees"
})


app.get("/api/v1/details", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});


app.get("/api/v1/employees/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees where ID= ? ";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        return res.json(results);
    })
});


app.post("/api/v1/create", (req, res) => {
    const sql = "INSERT INTO employees (`age`,`city`,`dob`,`name`,`sex`) VALUES (?)";
    const values = [
        req.body.age,
        req.body.city,
        req.body.dob,
        req.body.name,
        req.body.sex,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})


app.put("/api/v1/details/:id", (req, res) => {
    const sql = "update employees set `age` = ?,`city` = ?,`dob` = ?,`name` = ?,`sex` = ? where ID = ?";
    const values = [req.body.age, req.body.city, req.body.dob, req.body.name, req.body.sex]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})


app.delete("/api/v1/delete/:id", (req, res) => {
    const sql = "DELETE FROM employees WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})


app.post("/register", (req, res) => {
    const sql = "INSERT INTO register (`email`,`name`,`password`) VALUES (?)";
    const values = [
        req.body.email,
        req.body.name,
        req.body.password,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })
})


app.get("/getresponse/:email/:password", (req, res) => {
    // const email = req.body.email
    // const password = req.body.password
    const sql = "SELECT email FROM register WHERE email=@email";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.listen(8081, () => { console.log("listening"); })