const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,                         
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,          
    database: process.env.DATABASE
});



router.post("/create-short-url", function (req, res) {
	let longurl = req.body.longurl;
	db.query(`SELECT SHORTURL FROM LINK WHERE LONGURL=?`, [longurl], function (err, result) {
		if (err) {
			console.log(err);
			res.status(500).json({
				status: "notok",
				message: "Something went wrong"
			});
		}
		else if (result.length == 0) {
			let uniqueID = Math.floor(100 + 900 * Math.random());
			let sql = `INSERT INTO link(longurl,shorturl) VALUES('${longurl}','${uniqueID}')`;
			db.query(sql, function (error, result) {
				if (error) {
					console.log(error);
					res.status(500).json({
						status: "notok",
						message: "Something went wrong"
					});
				} else {
					res.status(200).json({
						status: "ok",
						shorturlid: uniqueID
					});
				}
			})
		}
		else {
			console.log(result);
			res.status(200).json({
				status: "ok",
				shorturlid: result[0].SHORTURL
			});
		}
	})

});



module.exports = router;