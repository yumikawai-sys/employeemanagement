const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const multer = require('multer');
const upload = multer();
const cors = require('cors');  
app.use(express.json());
app.use(cors({origin:'*'}));
let db = Database('database/Chinook_Sqlite.sqlite');
db = db.exec('PRAGMA foreign_keys=OFF');    //This is to disable foreign key constraint.(for Update & Delete)
app.set('port', process.env.PORT || 9999) 

//For Employee Table-----------------------------------------------------------------
//Add Employee
app.post('/employee',upload.none(),(req,res)=>{

    res.setHeader('Access-Control-Allow-Origin','*');

    //Insert the followings (total 14 items)
    //LastName,FirstName,Title,ReportsTo,BirthDate,HireDate,Address,
    //City,State,Country,PostalCode,Phone,Fax,Email
    const sql = "INSERT INTO Employee(LastName,FirstName,Title,ReportsTo,BirthDate,HireDate,Address,City,State,Country,PostalCode,Phone,Fax,Email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const statement = db.prepare(sql);
    //If Reportto is "", change it to null (-> foreign key constraint)
    if (req.body.ReportsTo==="")
    {
        req.body.ReportsTo = null;
    }
    const result = statement.run([req.body.LastName,req.body.FirstName,req.body.Title,req.body.ReportsTo,
        req.body.BirthDate,req.body.HireDate,req.body.Address,req.body.City,req.body.State,
        req.body.Country,req.body.PostalCode,req.body.Phone,req.body.Fax,req.body.Email]);
    res.json(result);
    res.end();

});

//View Employee
app.get('/employee',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "SELECT * FROM Employee";
    const statement = db.prepare(sql);
    const result = statement.all();
    res.json(result);
});

//Update Employee
app.put('/employee/:id', (req, res) => {
    const statement = db.prepare(`UPDATE Employee SET LastName=?,FirstName=?,Title=?,
    ReportsTo=?,BirthDate=?,HireDate=?,Address=?,City=?,State=?,
    Country=?,PostalCode=?,Phone=?,Fax=?,Email=? WHERE EmployeeId=?`);
    //If Reportto is "", change it to null (-> foreign key constraint)
    if (req.body.ReportsTo==="")
    {
        req.body.ReportsTo = null;
    }
    statement.run(req.body.LastName,req.body.FirstName,req.body.Title,req.body.ReportsTo,
        req.body.BirthDate,req.body.HireDate,
        req.body.Address,req.body.City,req.body.State,req.body.Country,
        req.body.PostalCode,req.body.Phone,req.body.Fax,req.body.Email,
        req.params.id);
    res.end();
    })

//Delete Employee
app.delete('/employee/:id', (req, res) => {
    const statement = db.prepare(`DELETE FROM Employee WHERE EmployeeId=?`);
    statement.run(req.params.id);
    res.end();
    })



//For Artist Table-----------------------------------------------------------------
//View Artist
app.get('/Artist',(req,res)=>{
const statement = db.prepare('SELECT * FROM Artist');
const result = statement.all();
res.json(result);
})

//Add Artist
app.post('/Artist',upload.none(),(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');

    const sql = "INSERT INTO Artist(Name) VALUES(?)";
    const statement = db.prepare(sql);
    const result = statement.run([req.body.Name]);
    res.json(result);
    res.end();
});

//Update Artist
app.put('/Artist/:id', (req, res) => {
const statement = db.prepare(`UPDATE Artist SET Name=? WHERE ArtistId=?`);
statement.run(req.body.Name,req.params.id);
res.end();
})

//Delete Artist
app.delete('/Artist/:id', (req, res) => {
const statement = db.prepare(`DELETE FROM Artist WHERE ArtistId=?`);
statement.run(req.params.id);
res.end();
})

app.listen(app.get('port'));
