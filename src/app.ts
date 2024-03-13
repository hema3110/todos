import express from "express"
import todoRoutes from "./routes"
import dotEnv from 'dotenv';
import { connect } from 'mongoose';
import bodyParser from "body-parser";

// Put all the required variables in .env
dotEnv.config();

// Express Application
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(todoRoutes);

//PORT our server will run on
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI || '';

// We are just starting the server and connecting to MongoDB
(async () => {
    try {
        await connect(MONGO_URI);
        console.log("Connected to MongoDB!")
        await app.listen(PORT);
        console.log("Express server listening on port = " + PORT);
    } catch (err) {
        console.log(err);
        throw err;
    }
})()

// startup();