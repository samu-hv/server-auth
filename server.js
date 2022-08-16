//Express: is our webserver
//Body-parses is the middleware to handle form data such as user login (or registration)

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

let testUser = { userName: "test", password: "1234" };

// DECLARE JWT-secret
const JWT_Secret = "your_secret_key";

app.get("/", function (req, res) {
  res.send("Hello from server");
});

app.post("/api/authenticate", (req, res) => {
  if (req.body) {
    let user = req.body;
    console.log(user);
    if (
      testUser.userName === req.body.user &&
      testUser.password === req.body.password
    ) {
      let token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token,
      });
    } else {
      res.status(403).send({
        errorMessage: "Authorization required!",
      });
    }
  }
  // else {
  //   res.status(403).send({
  //     errorMessage: "Incorrect username and/or password!",
  //   });
  // }
});

app.get("/api/authenticate", (req, res) => {
  res.send(testUser);
  console.log(res);
});

app.listen(PORT, function () {
  console.log("Server running on localhost: " + PORT);
});
