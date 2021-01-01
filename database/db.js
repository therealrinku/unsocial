const pg = require("pg");
const dbUrl = require("./dbUrl");

const db = new pg.Client(dbUrl);

db.connect()
	.then(() => {
		console.log("connected to postgres successfully.");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = db;
