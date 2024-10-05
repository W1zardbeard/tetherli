import express from "express";
const app = express.Router();




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
  


  export {app as router};