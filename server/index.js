import  express  from "express";

import bodyParser from 'body-parser';
import dotenv from "dotenv";
import Connection from './database/db.js';
import cors from "cors";

import Router from "./routes/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',Router);


const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);