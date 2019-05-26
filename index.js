const config = require('./config');
const express = require('express')
import JsonDB from 'node-json-db';
import { Config } from './node_modules/node-json-db/dist/lib/JsonDBConfig';
const app = express();
const port = 3000;

const db = new JsonDB(new Config("database", true, false, '/'));
db.push("/test1","super test");
console.log("Pushed!");
db.save();
db.reload();


app.set('json spaces', 40);

app.get('/', (req, res) => res.send('Hello World!'))

app.all('/api/v1/get-balance', (req, res) => {
	config.keys.forEach((val) => {
		if(val.key == req.query.key) {
			res.json({"response": "success"});
		} else {
			res.json({"response": "error", "type": "noperm", "message": "You don't have permission to access this endpoint."});
		}
	});
});

app.listen(port, () => console.log(`App listening on port ${port}!`))