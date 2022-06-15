const express = require("express");
const mysql = require("mysql");
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
app.use(express.static("views"));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,                         
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,          
    database: process.env.DATABASE
});
db.connect(function(error){
	if(error){
		console.log("Database connection failed");
	}
    console.log("Database Connected");
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/views/demo.html");
})
app.use('/api', require("./routes/pages.js"));


app.listen(3000);