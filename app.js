const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cors = require("cors");

const app = express();

app.use(express.json());

const PORT = 8000;

dotenv.config();
const { DB_URL } = process.env;
console.log(DB_URL);
console.log(process.env.DB_URL);

async function connect() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!", error.message);
  }
}

// app.use(
//   cors({
//     origin: "https://angular-lovat-ten.vercel.app",
//   })
// );

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

connect();
const routes = require("./routes");
routes(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
