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

import {router as authRouter} from "./routes/auth.js";

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


//router setup
app.use("/auth", authRouter);





// ==============================
// Multer setup for file storage configuration
// ==============================
const storage = multer.diskStorage({  
  // Define the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'userAvatars') // Save files in the 'userAvatars' directory
  },
  // Define the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a unique suffix using the current timestamp and a random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    // Extract the original file extension
    const originalFileType = file.originalname.split('.').pop();
    // Construct the new filename using the field name, unique suffix, and original file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalFileType)
  }
})



// ==============================
// Multer upload configuration
// ==============================
const upload = multer({ 
  // Specify the storage configuration
  storage: storage,
  // Set file size limit to 1MB
  limits: { fileSize: 1048576 }, 
  // File filter to check file type
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});




// ==============================
// Function to check the file type of the uploaded file
// ==============================
function checkFileType(file, cb) {
  // Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif/;
  // Extract the original file extension
  const originalFileType = file.originalname.split('.').pop();
  // Check if the file extension is allowed
  const extname = fileTypes.test(originalFileType.toLowerCase());
  // Check if the MIME type is allowed
  const mimetype = fileTypes.test(file.mimetype);
  // If both the extension and MIME type are allowed, proceed
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // If not, return an error
    return cb("Error: Images only!");
  }
}



// ==============================
// Endpoint to verify JWT token
// ==============================
app.post("/api/verify-token", (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1];

  // Verify the token with the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Log the error and send a 403 Forbidden status if token verification fails
      console.log("Error verifying token: ", err);
      return res.sendStatus(403);
    }
    // Send a 200 OK status if token verification is successful
    res.sendStatus(200);
  });
});





// ==============================
// Login Endpoint
// ==============================
app.post("/api/login", async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  try {
    // Query user from the database
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    // Check if user exists
    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      const storedHashPassword = user.password;
      const userCreds = { email: user.email, userId: user.id };
      // Compare password with the hashed password in the database
      const match = await bcrypt.compare(password, storedHashPassword);
      if (match) {
        // If password matches, generate a JWT token
        const accessToken = jwt.sign(
          { userCreds },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          message: "Login successful",
          token: accessToken
        });
      } else {
        // If password mismatch
        res.status(401).send("Incorrect password");
      }
    } else {
      // If user not found
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});




// ==============================
// Middleware to authenticate token
// ==============================
function authenticateToken(req, res, next) {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  // Extract the token from the header
  const token = authHeader && authHeader.split(' ')[1];
  // If no token is found, redirect to login
  if (token == null) return res.redirect("/login");

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCreds) => {
    // If token verification fails, send a 403 Forbidden status
    if (err) return res.sendStatus(403);
    // Attach the user credentials to the request object
    req.user = userCreds;
    // Proceed to the next middleware or route handler
    next();
  });
}





// ==============================
// Register Endpoint
// ==============================

app.post("/api/register", async (req, res) => {
  // Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if the email already exists in the database
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // If email already exists, send a response indicating so
    if (checkResult.rows.length > 0) {
      res.status(400).send("Email already exists. Try logging in.");
    } else {
      // Hash the password using bcrypt
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          // Log any error that occurs during hashing
          console.log("Error with hashing: ", err);
        } else {
          try {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
              [email, hash]
            );

            const userCreds = { email, userId: result.rows[0].id };
            // If successful, send a response indicating successful registration
            const accessToken = jwt.sign(
              { userCreds },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1h' }
            );
            res.status(200).json({
              message: "Login successful",
              token: accessToken
            });
          } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// ==============================
// Add username Endpoint
// ==============================
app.post("/api/addUsername", authenticateToken, async (req, res) => {
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;
  // Extract username from the request body
  const username = req.body.username;
  try{
    // Check if the username already exists in the database
    const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    // If username already exists, send a response indicating so
    if (checkResult.rows.length > 0) {
      res.status(400).send("Username already exists. Try another username.");
    } else {
      // Update the user's username in the database
      await db.query("UPDATE users SET username = $1 WHERE id = $2", [username, userId]);
      // Send a success response
      res.status(200).send("Username added successfully");
    }
  }catch(err){
    console.log(err);
    res.status(500).send("Server error");
  }
});




// ==============================
// Add names Endpoint
// ==============================
app.post("/api/addNames", authenticateToken, async (req, res) => {
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;
  // Extract first name and last name from the request body
  const { first_name, last_name } = req.body;
  try {
    // Update the user's first name and last name in the database
    await db.query("UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3", [first_name, last_name, userId]);
    // Send a success response
    res.status(200).send("Names added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});







// ==============================
// Get user links Endpoint
// ==============================
app.get("/api/userLinks", authenticateToken, async (req, res) => {
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;

  try {
    // Query the database to get links associated with the user ID
    const getLinks = await db.query("SELECT * FROM links WHERE user_id = $1", [
      userId,
    ]);

    // If no links are found, send an empty array
    if (getLinks.rows.length === 0) {
      return res.send([]);
    }

    // Send the retrieved links as the response
    res.send(getLinks.rows);
  } catch (err) {
    // Log any error that occurs during the database query
    console.log(err);
    // Send a 500 Internal Server Error status if an error occurs
    res.status(500).send("Server error");
  }
});



// ==============================
// Get user info Endpoint
// ==============================
app.get("/api/userInfo", authenticateToken, async (req, res) => {
  try {
    // Extract user ID from the authenticated user credentials
    const userId = req.user.userCreds.userId;

    // Query the database to get user information based on user ID
    const getInfo = await db.query(
      "SELECT email, first_name, last_name, avatar, username, id, show_email, show_name FROM users WHERE id = $1",
      [userId]
    );

    // If no user information is found, send a response indicating so
    if (getInfo.rows.length === 0) {
      return res.send("No Info!");
    }

    // Send the retrieved user information as the response
    res.json(getInfo.rows[0]);
  } catch (err) {
    // Log any error that occurs during the database query
    console.log(err);
    // Send a 500 Internal Server Error status if an error occurs
    res.status(500).send("Server error");
  }
});



// ==============================
// Save links query function
// ==============================
const upsertLinks = async (userId, savedLinks) => {
  // SQL query to insert links into the database
  const query = `
  INSERT INTO links (user_id, link, type, link_id)
  VALUES ($1, $2, $3, $4)
  `;
  try {
    // Loop through each link in the savedLinks array
    for (const link of savedLinks) {
      // Define the values to be inserted for each link
      const values = [userId, link.link, link.type, link.link_id];
      // Execute the query with the defined values
      await db.query(query, values);
      // Log the upserted link
      console.log(`Upserted link: ${link.link}`);
    }
  } catch (err) {
    // Log any error that occurs during the upsert operation
    console.error("Error upserting links: ", err);
  }
}





// ==============================
// Save links Endpoint
// ==============================
app.post("/api/saveLinks", authenticateToken, async (req, res) => {
  // Log the request body for debugging purposes
  console.log(req.body);
  
  // Extract the saved links from the request body
  const savedLinks = req.body.userLinks;
  
  // Extract the user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;
  
  try {
    // Delete existing links for the user from the database
    await db.query("DELETE FROM links WHERE user_id = $1", [userId]);
    
    // Upsert the new links into the database
    upsertLinks(userId, savedLinks);
    
    // Send a success response
    res.status(200).send("Links saved successfully");
  } catch (err) {
    // Log any error that occurs during the delete or upsert operation
    console.error("Error deleting links: ", err);
    
    // Send a 500 Internal Server Error status if an error occurs
    res.status(500).send("Server error");
  }
});






// ==============================
// Remove specific link Endpoint
// ==============================
app.post("/api/removeLink", authenticateToken, async (req, res) => {
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;
  // Extract link ID from the request body
  const link_id = req.body.link_id;

  try {
    // Delete the specific link from the database based on link ID and user ID
    await db.query("DELETE FROM links WHERE link_id = $1 AND user_id = $2", [link_id, userId]);
    // Log the successful removal of the link
    console.log(link_id + ": Link removed successfully");
    // Send a success response
    res.status(200).send("Link removed successfully");
  } catch (err) {
    // Log any error that occurs during the delete operation
    console.error("Error removing link: ", err);
    // Send a 500 Internal Server Error status if an error occurs
    res.status(500).send("Server error");
  }
});






// ==============================
// Upload avatar Endpoint
// ==============================
app.post("/api/uploadAvatar", authenticateToken, upload.single("file"), async (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1];
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;

  // Log the path of the uploaded file for debugging purposes
  console.log(req.file.path);

  // Check if no file was received
  if (!req.file) {
    return res.status(400).send("No file received");
  } else if (req.file.size > 1048576) {
    // Check if the file size exceeds the limit
    return res.status(400).send("File size too large");
  }

  

  // Update the user's avatar in the database with the file path
  try{
    updateAvatar(userId, req.file.path);
    // Send a success response
    res.status(200).send("Avatar uploaded successfully");
  }catch(err){
    // Log any error that occurs during the update operation
    console.error("Error updating avatar: ", err);
    // Send a 500 Internal Server Error status if an error occurs
    res.status(500).send("Server error, please try again");
  }
  
});





// ==============================
// Update avatar query function
// ==============================
async function updateAvatar(userId, avatarPath) {
  // SQL query to update the user's avatar in the database
  const query = `
  UPDATE users 
  SET avatar = $1
  WHERE id = $2
  `;
  try {
    // Execute the query with the provided avatar path and user ID
    await db.query(query, [avatarPath, userId]);
    // Log the successful update of the avatar
    console.log(`Updated avatar for user: ${userId} with path: ${avatarPath}`);
  } catch (err) {
    // Log any error that occurs during the update operation
    console.error("Error updating avatar: ", err);
  }
}



// ==============================
// Endpoint to update user details
// ==============================
app.post("/api/updateUserInfo", authenticateToken, async (req, res) => {
  // Log the request body for debugging purposes
  console.log(req.body); 
  // Extract user ID from the authenticated user credentials
  const userId = req.user.userCreds.userId;
  // Log the user ID for debugging purposes
  console.log(userId); 
  // Extract user details from the request body
  const { email, first_name, last_name, username, show_name, show_email } = req.body;
  // SQL query to update user details in the database
  const query = `
  UPDATE users
  SET email = $1, first_name = $2, last_name = $3, username = $4, show_name = $6, show_email = $7
  WHERE id = $5
  `;
  try {
    // Execute the query with the provided user details and user ID
    await db.query(query, [email, first_name, last_name, username, userId, show_name, show_email]);
    // Send a success response indicating the user details were updated
    res.status(200).send("User details updated");
  } catch (err) {
    // Log any error that occurs during the update operation
    console.error("Error updating user details: ", err);
    // Check if the error is due to a unique email constraint violation
    if (err.code === "23505" && err.constraint === "unique_email") {
      // Send a 400 Bad Request status indicating the email already exists
      res.status(400).send("Email already exists");
    // Check if the error is due to a unique username constraint violation
    } else if (err.code === "23505" && err.constraint === "unique_username") {
      // Send a 400 Bad Request status indicating the username already exists
      res.status(400).send("Username already exists");
    } else {
      // For any other errors, send a 500 Internal Server Error status
      res.status(500).send("Server error");
    }
  
  }
});






// ==============================
// Start the server
// ==============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
