import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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



app.post("/api/verify-token", (req,res) =>{

})





//Login ============================================

app.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  

    try{
      // Query user from the database
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email,]);

      

      if (checkResult.rows.length > 0){
        const user = checkResult.rows[0];
        const storedHashPassword = user.password;
        const userCreds = { email: user.email, userId: user.id};
       
      

        // Compare password with the hashed password in the database
        bcrypt.compare(password, storedHashPassword, (err, result) =>{
          if(err){
            console.log("Error comparing passwords: ",err);
            return res.status(500).send("Server error");
          }
          
          
            if(result){
              // Password matches, generate a JWT token
              const accessToken =  jwt.sign(
                {userCreds},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
              );
              res.status(200).json({
                message: "Login successful",
                token: accessToken
            });
            }else{
              // Password mismatch
              res.status(401).send("Incorrect password");
            }
          });
        
          //end bcrypt

      } else{
        // User not found
        res.status(404).send("User not found");
      }
    }catch(err){
      console.log(err);
      res.status(500).send("Server error");
    }

});


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.redirect("/login");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCreds) => {
    if (err) return res.sendStatus(403)
      req.user = userCreds
      next()
  })
}





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



app.get("/api/userLinks", authenticateToken, async (req, res) => {
 console.log(req.user.userCreds.userId);
  const userId = req.user.userCreds.userId;

  try{
    const getLinks = await db.query("SELECT * FROM links WHERE user_id = $1", [
      userId,
    ]);

    if (getLinks.rows.length === 0) {
      return res.send([]);
  }
 
    res.send(getLinks.rows);
  }catch(err){
    console.log(err);
    res.status(500).send("Server error");
  }
})

app.get("/api/userInfo", authenticateToken, async (req, res) => {
  try{
    const userId = req.user.userCreds.userId;
    const getInfo = await db.query("SELECT email FROM users WHERE id = $1", [
      req.query.id,
    ]);

    if (getInfo.rows.length === 0) {
      return res.send("No Info!");
  }
    res.json(getInfo.rows[0]);

  
  }catch(err){  
    console.log(err);
    res.status(500).send("Server error");
  }
})










const upsertLinks = async (userId, savedLinks) =>{
  const query = `
  INSERT INTO links (user_id, link, type, index)
  VALUES ($1, $2, $3, $4)
  `
  try {
    for (const link of savedLinks) {
      const values = [userId, link.link, link.type, link.index];
      await db.query(query, values);
      console.log(`Upserted link: ${link.link}`);
    }
  } catch (err) {
    console.error("Error upserting links: ", err);
  }

}


app.post("/api/saveLinks", authenticateToken, async (req, res) => {

  const savedLinks = req.body.userLinks;
  const userId = req.user.userCreds.userId;

  

  try{
    
    await db.query("DELETE FROM links WHERE user_id = $1", [userId]);
  }catch (err){
    console.error("Error deleting links links: ", err);
  }

 

  upsertLinks(userId, savedLinks);
  
})







app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
