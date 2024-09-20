import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import {join, dirname} from "path";
import { fileURLToPath } from "url";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();
const port = 3000;
app.use(express.static(join(__dirname, "public")));
// Load environment variables
env.config();

// Bcrypt salt rounds
const saltRounds = 10;

// Database connection
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


//multer set up 
const storage = multer.diskStorage({  
  destination: function (req, file, cb) {
    cb(null, 'userAvatars')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    const originalFileType = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalFileType)
  }
})

//Multer upload config
const upload = multer({ 
  storage: storage,
  limits:{fileSize: 1000000}, 
  fileFilter: function( req, file, cb){
    checkFileType(file, cb);
  }
});

//check file type
function checkFileType(file, cb){
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const originalFileType = file.originalname.split('.').pop();
  const extname = fileTypes.test(originalFileType.toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  // Check mime
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Images only!");
    
  }
}



app.post("/api/verify-token", (req,res) =>{
// Verify the token
const token = req.headers.authorization.split(" ")[1];
// Verify the token with the secret key
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  if(err){
    console.log("Error verifying token: ", err);
    return res.sendStatus(403);
  }
  res.sendStatus(200);
});

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

//Middleware to authenticate token
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


//Get user links
app.get("/api/userLinks", authenticateToken, async (req, res) => {
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




//Get user info
app.get("/api/userInfo", authenticateToken, async (req, res) => {
 
  try{
    const userId = req.user.userCreds.userId;
    const getInfo = await db.query("SELECT email, first_name, last_name, avatar FROM users WHERE id = $1", [
      userId,
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



//Save links query
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

//Save links
app.post("/api/saveLinks", authenticateToken, async (req, res) => {

  console.log(req.body);
  const savedLinks = req.body.userLinks;
  const userId = req.user.userCreds.userId;
  try{
    
    await db.query("DELETE FROM links WHERE user_id = $1", [userId]);
  }catch (err){
    console.error("Error deleting links links: ", err);
  }
  upsertLinks(userId, savedLinks);
  
})


//Upload avatar
app.post("/api/uploadAvatar", authenticateToken, upload.single("file"), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.user.userCreds.userId;
  

  console.log(req.file.path);

  if(!req.file){
    return res.status(400).send("No file received");
  }else if(req.file.size > 1048576){
    return res.status(400).send("File size too large");
  }

  res.send("File received");


  updateAvatar(userId, req.file.path);
});


//Update avatar query
async function updateAvatar(userId, avatarPath){
  const query = `
  UPDATE users 
  SET avatar = $1
  WHERE id = $2
  `
   try{
    await db.query(query, [avatarPath, userId]);
    console.log(`Updated avatar for user: ${userId} with path: ${avatarPath}`);
   } catch(err){
     console.error("Error updating avatar: ", err);
   }
}

//update user details
app.post("/api/updateUserInfo", authenticateToken, async (req, res) => {
  console.log(req.body);
  const userId = req.user.userCreds.userId;
  console.log(userId); 
  const { email, first_name, last_name } = req.body;
  const query = `
  UPDATE users
  SET email = $1, first_name = $2, last_name = $3
  WHERE id = $4
  `
  try{
    await db.query(query, [email, first_name, last_name, userId]);
    res.send("User details updated");
  }catch(err){
    console.error("Error updating user details: ", err);
    res.status(500).send("Server error");
  }
})







app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
