import express from "express"
import { configDotenv } from "dotenv"

configDotenv();

const app = express();
const port = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("Anshul");
})

app.listen(port);