import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { connectionDB } from './config/connection.js';
import { error } from 'console';
import appRouter from './routes/index.routes.js';

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json()); //middleware - convert json body send by the user
app.use(morgan('dev')); //middleware - log the request in the console
app.use("/api/v1",appRouter);


connectionDB().then(() => {
  app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
  })  
}).catch(error => console.log(error));

