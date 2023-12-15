// Import all server modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require('mysql2');


// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.listen(8081, () => {
    console.log("server is running on port: 8081")
});

// Mongodb setup
mongoose.connect('mongodb://localhost:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to db");
})
.catch((error) => {
    console.error("error connecting to db", error);
});

// MySQL setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ClientSign'
  });

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

//   //connection.query(`SELECT * FROM Customer `, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });

  // const newCustomer = {
  //   name: 'Luke',
  //   email: 'Luke@aol.com'
  // };
  
  // 
  // connection.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }
  
  //   console.log("created cutomer: ", { id: res.insertId, ...newCustomer });
  //   result(null, { id: res.insertId, ...newCustomer });
  // });

  // Express API endpoint
  app.get('/customer',(req,res) => {res.json({message:"Testing a server page"})
  });

  app.get('/customers',(req,res) => {
    console.log (req.query.programid);
    var query;
    if (req.query.programid)
      query = "SELECT * FROM Customer WHERE ProgramId = " +"'"+req.query.programid+"'";
    else 
      query = "SELECT * FROM Customer";
    connection.query(query, (err, data) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Customers: ", data);
    res.json(data);
    });
    
  //   res.json({message:"Testing a server page"})
  });

  app.get('/customerDetails',(req,res) => {
    console.log (req.query.email);
    var query;
    if (req.query.email)
      query = "SELECT * FROM Customer WHERE Email = " +"'"+req.query.email+"'";
    else 
      query = "SELECT * FROM Customer";
    connection.query(query, (err, data) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Customers: ", data);
    res.json(data);
    });
    
  //   res.json({message:"Testing a server page"})
  });


//   app.get('/customer',(req,res) => {res.json({message:"Testing a server page"})
// });

app.post('/newcustomer',(req,res) => {
  connection.query("INSERT INTO Customer SET ?", req.body, (err, data) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  console.log("newcustomers: ", data);
  res.json(data);
  });
  
//   res.json({message:"Testing a server page"})
});

app.post('/newsignature',(req,res) => {
  connection.query("INSERT INTO SignIn SET ?", req.body, (err, data) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  console.log("newsignature: ", data);
  // res.json(data);
  });
  
//   res.json({message:"Testing a server page"})
});


// app.get('/search', (req, res) => {
//   connection.query("SELECT * FROM Customer WHERE CONTAINS(name, req.searchTerm)", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
  
//     console.log("created cutomer: ", { id: res.insertId, ...searchResult });
//     result(null, { id: res.insertId, ...searchResult });
//   });
//   res.json(searchResult)
// });

