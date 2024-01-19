const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());

const PORT = 8000;

dotenv.config();
const { DB_URL } = process.env;
console.log(DB_URL);
console.log(process.env.DB_URL);

async function connect() {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/nodejs");
    await mongoose.connect(DB_URL);
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!", error.message);
  }
}

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

connect();
const routes = require("./routes");
routes(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
