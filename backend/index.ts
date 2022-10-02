import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import * as lodash from "lodash";
import { ObjectId } from "mongodb";

dotenv.config();

const app: Application = express();
const port = process.env.PORT

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect((err: any) => {
  console.log(err);
});
console.log("reaching index file");

const database = client.db("food-database");

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// get all posts and elements
app.get(
	"/content",
	async (req: Request, res: Response): Promise<Response> => {
		const data = await database.collection("food-collection").find().toArray();
		return res.status(200).send(data);
	}
)

app.post(
	"/content",
	async (req: Request, res: Response): Promise<Response> => {
		const data = req.body;
		data.date = new Date();
		const result = await database.collection("food-collection").insertOne(data);
		return res.status(201).send(result);
	}
)

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}
