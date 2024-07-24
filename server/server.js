import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post("/api/login", (req, res) => {
    res.send("hello you have tickled me");
    console.log(req.body);
})

app.post("/api/register", async (req, res) => {
    res.send("now youre just jorking me");
    console.log(req.body);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
