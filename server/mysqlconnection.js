//Initialize dependencies
var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");

var date = new Date;
var time = date.toLocaleTimeString();

//Initiate Express
var app = express();

//BodyParser
app.use(bodyparser.json());

//Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Create Connection
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "123456789",
    multipleStatements: true
    // database: "restapi"
    // database : "angulardb" //mention database here if it is already present in the database
});

//Mysql Commands
var sqlCommand = `
create database restapi;

use restapi;

create table persons(id int(11) auto_increment not null, NAME varchar(30) not null, AGE int(11) not null, HEIGHT float not null, WEIGHT int(11) not null, primary key (id));
`
var sqlCommandExist =`use restapi;
create table persons(id int(11) auto_increment not null, NAME varchar(30) not null, AGE int(11) not null, HEIGHT float not null, WEIGHT int(11) not null, primary key (id));`

var sqlCreateTable = `create table persons(id int(11) auto_increment not null, NAME varchar(30) not null, AGE int(11) not null, HEIGHT float not null, WEIGHT int(11) not null, primary key (id));`
//Connect to the Mysql Database and create database & table if they dont exist
con.connect((err)=>{
    if(!err){
        console.log("MYSQL DB connection SUCCEDED..! :)");
    }
    else{
        console.log("MySQl DB Connection FAILED..! :(" + JSON.stringify(err, undefined, 2));
    }

con.query(sqlCommand, function (err, result) {//create database and use it  if does'nt exist
   if (err){
    con.query(sqlCommandExist, (err,result)=>{//if already exist use the database and create table
        if (err){
            console.log("Table already exists");
        }
        // else{
        //     con.query(sqlCreateTable, (err, result)=>{//if table doesnt exist create one
        //         console.log(err)
        //     })
        // }
    })
    console.log("Database already exists, using the exisiting database");
   }
   else console.log(" Database restapi created with a table 'persons' ")  
 });

});


//GET ALL PERSONS data
app.get("/getdata",(req, res)=>{
    con.query("select * from persons", (err, rows, feilds)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Get Person by ID
app.get("/getdata/:id", (req, res)=>{
    con.query('select * from persons where ID=?',[req.params.id], (err, rows, feilds)=>{
        if(!err){
            res.send (rows);
        }
        else
            console.log(err);
    })
})

// insert data
app.post("/addperson", (req, res)=>{
    var data = {
        id: req.body.id,
        name: req.body.NAME,
        age: req.body.AGE,
        height: req.body.HEIGHT,
        weight: req.body.WEIGHT
    }
    con.query('insert into persons SET?', data, (err, rows, feilds)=>{
        if(!err){
            console.log(`Record inserted Successfully at ${time}`);
        }
        else
            console.log(err)
    })
})

//Delete Person
app.delete("/getdata/:id", (req, res)=>{
    con.query('delete from persons where id =?', [req.params.id], (err, rows , feilds)=>{
        if(!err){
            console.log("-------------Deleted Succesfully------------");
        }
        else
            console.log(err);
    })
})

//List to the port number 8080
app.listen(8080);
console.log(`The running API's are http://localhost:8080/getdata`);
