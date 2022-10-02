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

const database = client.db("");

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send({
			message: "Hello World!",
		});
	}
);

// gets all users
app.get(
	"/users",
	async (req: Request, res: Response): Promise<Response> => {
		const data = await database.collection("users").find().toArray();
		return res.status(200).send(data);
	}
)

// gets a user by username for sign in purposes
app.get(
	"/users/:id",
	async (req: Request, res: Response): Promise<Response> => {
		const params = req.params;
		const data = await database.collection("users").findOne({ username: params.id });
		if (data === null) { // user doesn't exist
			return res.status(404).send({ message: "User not found" });
		}

		// user exists in database
		return res.status(200).send(data);
	}
)

app.get(
	"/usersById/:id",
	async (req: Request, res: Response): Promise<Response> => {
		const params  = req.params;
		const data = await database.collection("users").findOne(new ObjectId(params.id));
		if (data === null) { // user doesn't exist
			return res.status(404).send({ message: "User not found" });
		}

		// user exists in database
		return res.status(200).send(data);
	}
)

app.post(
	"/users",
	async (req: Request, res: Response): Promise<Response> => {
		const data = req.body;

		// add new user
		const result = await database.collection("users").insertOne(data);
		// after insertion query new user and return it
		const newUser = await database.collection("users").findOne({ _id: result.insertedId });
		return res.status(201).send(newUser);
	}
)

// get all posts and elements
app.get(
	"/content",
	async (req: Request, res: Response): Promise<Response> => {
		const data = await database.collection("content").find().toArray();
		return res.status(200).send(data);
	}
)

app.post(
	"/content",
	async (req: Request, res: Response): Promise<Response> => {
		const data = req.body;
		data.date = new Date();
		const result = await database.collection("content").insertOne(data);
		return res.status(201).send(result);
	}
)

app.get(
	"/content/:id",
	async (req: Request, res: Response): Promise<Response> => {
		const params = req.params;
		const data = await database.collection("content").findOne({ _id: params.id });
		if (data === null) { // user doesn't exist
			return res.status(404).send({ message: "Post not found" });
		}

		// user exists in database
		return res.status(200).send(data);
	}
)

// gets content that matches search query
app.get(
	"/search/:query",
	async (req: Request, res: Response): Promise<Response> => {
		const params = req.params;
		const data = await database.collection("content").find(
			{$or : [
				{"body" : {$regex : params.query, $options: 'i'}},
				{"category" : {$regex : params.query, $options: 'i'}},
				{"title" : {$regex : params.query, $options: 'i'}}
			]}
        ).toArray();
		if (data === null) { // user doesn't exist
			return res.status(404).send({ message: "Search error" });
		}

		// user exists in database
		return res.status(200).send(data);
	}
)

app.put(
	"/users/:id/points",
	async (req: Request, res: Response): Promise<Response> => {
		const params = req.params;
		const data = req.body; // new point value
;
		// parse the points out of the body
		let points: number;
		try {
			points = parseInt(data.points);
		} catch {
			return res.status(400).send({ message: "ERROR" });
		}

		// check if the user has points
		const user = await database.collection("users").findOne(new ObjectId(params.id));
		if (lodash.has(user, "points")) {
			points += user.points;
		}
		
		const result = await database.collection("users").updateOne({ _id: new ObjectId(params.id) }, { $set: { points: points } });
		if (result.acknowledged !== true) {
			return res.status(404).send({ message: "ERROR" });
		}
		return res.status(201).send({ message: "SUCCESS", points: points });
	}
)

app.get(
	"/leaderboard",
	async (req: Request, res: Response): Promise<Response> => {
		const data = await database.collection("users").find().sort({ points: -1 }).toArray();
		return res.status(200).send(data);
	}
)

app.post(
	"/comments", 
	async (req: Request, res: Response): Promise<Response> => {
		const data = req.body;
		const result = await database.collection("comments").insertOne(data);
		return res.status(201).send(result);
	}
)

app.get(
	"/comments/:postId",
	async (req: Request, res: Response): Promise<Response> => {
		const params = req.params;
		const data = await database.collection("comments").find({ postId: params.postId }).toArray();
		if (data === null) { // data doesn't exist
			return res.status(404).send({ message: "Comments not found" });
		}
		return res.status(200).send(data);
	}
)

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}
