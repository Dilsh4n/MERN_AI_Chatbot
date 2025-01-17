import express from 'express';
import dotenv from 'dotenv'
import { connectionDB } from './config/connection.js';
import { error } from 'console';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json()); //middleware - convert json body send by the user

app.get("/",(req,res) => {return res.send("server is ready to use")})

connectionDB().then(() => {
  app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
  })  
}).catch(error => console.log(error));

