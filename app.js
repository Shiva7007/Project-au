const express = require("express");

const userRouter = require("./routes/user");


const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use('/', express.static(__dirname + '/views'));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/", userRouter);

app.listen(9999, () => {
  console.log("Server is Running");
});
