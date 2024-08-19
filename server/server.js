import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
env.config();

const saltRounds = 10;

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


//Login ============================================

app.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    try{
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (checkResult.rows.length > 0){
        const user = checkResult.rows[0];
        const storedHashPassword = user.password;

        bcrypt.compare(password, storedHashPassword, (err, result) =>{
          if(err){
            console.log("Error comparing passwords: ",err);
          }else{
            console.log(result);
            if(result){
              res.redirect("/editor");
            }else{
              res.send("Inccorect password");
            }
          }
        })
      } else{
        res.send("User not found");
      }
    }catch(err){
      console.log(err);
    }

})

//Register ============================================

app.post("/api/register", async (req, res) => {
   
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    try{
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (checkResult.rows.length > 0){
        res.send("Email already exists. Try logging in.");
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if(err){
            console.log("Error with hashing: " , err);
          }else{
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2)",
              [email, hash]
            );
            console.log(result);
            res.redirect("/editor");
          }
        })
      }
    } catch(err){
      console.log(err);
    }
})


//Mock user data ============================================

var userData = {
  name: "Tom Main",
  email: "tommain1498@gmail.com",
  avatar: "bananas",

  links: [
    {
      type: "github",
      link: "https://google.com"
    },
    {
      type: "twitter",
      link: "https://google.com"
    },
    // {
    //   type: "instagram",
    //   link: "https://google.com"
    // },
    // {
    //   type: "youtube",
    //   link: "https://google.com"
    // },
    // {
    //   type: "steam",
    //   link: "dfsdfSss"
    // }
  ]
}

//Mock user data api call ============================================
app.get("/api/mockuserData", (req, res) => {
  res.send(userData);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
