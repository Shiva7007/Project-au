const db = require("./dbConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { render } = require("ejs");

const secretKey =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const userPost = async (req, res) => {
  const pass = await bcrypt.hash(req.body.password, 12);
  const userNew = {
    email: req.body.email,
    username: req.body.username,
    password: pass,
    token: ""
  };
  try {
    const createdUser = await db.dbFirst.collection("user").insertOne(userNew);
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};

const userGet = async (req, res) => {
  try {
    const rawData = await db.dbFirst.collection("user").find().toArray();
    res.send(rawData);
  } catch (err) {
    console.log(err);
  }
};

const userGetone = async (req, res) => {
  try {
    const rawData = await db.dbFirst
      .collection("user")
      .find({ username: req.params.username })
      .toArray();
    res.send(rawData);
  } catch (err) {
    console.log(err);
  }
};

const userUpdate = async (req, res) => {
  try {
    const rawData = await db.dbFirst
      .collection("user")
      .find({ username: req.params.username })
      .toArray();
    let updatedEmail = rawData[0].email;
    let updatedUsername = rawData[0].username;
    let updatedPassword = rawData[0].password;

    if (req.body.email) {
      updatedEmail = req.body.email;
    }
    if (req.body.username) {
      updatedUsername = req.body.username;
    }
    if (req.body.password) {
      updatedPassword = req.body.password;
    }
    await db.db.collection("user").updateOne(
      { username: req.params.username },
      {
        $set: {
          email: updatedEmail,
          username: updatedUsername,
          password: updatedPassword,
        },
      }
    );
    res.send("Updated");
  } catch (err) {
    console.log(err);
  }
};

const userDelete = async (req, res) => {
  try {
    await db.dbFirst.collection("user").deleteOne({ username: req.params.username });
    res.send("Deleted");
  } catch (err) {
    console.log(err);
  }
};

const loginCheck = async (req, res) => {
  console.log(req.body);
  try {
    let rawData = await db.dbFirst
      .collection("user")
      .find({ username: req.body.username })
      .toArray();
    if (
      rawData[0] &&
      (await bcrypt.compare(req.body.password, rawData[0].password))
    ) {
      let token = jwt.sign(
        { email: rawData[0].email, username: rawData[0].username },
        secretKey
      );
      console.log({ token });
      await db.dbFirst
        .collection("user")
        .updateOne(
          { username: rawData[0].username },
          { $set: { token: token } }
        );
      if(!token){
        res.render("login");
      }
      res.render("home",{data:rawData[0]});
    } else {
      res.send({message:"Fail"});
    }
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.send(err);
  }
};

const signup = (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.send(err);
  }
};

const home = (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    res.send(err);
  }
};

const logout = async (req, res) => {
  console.log("logout");
};

module.exports = {
  userPost,
  userGet,
  userGetone,
  userUpdate,
  userDelete,
  loginCheck,
  login,
  signup,
  home,
  logout
};
