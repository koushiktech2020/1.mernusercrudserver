const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { dbconnect } = require("./utils/dbconnect");
const userRoutes = require("./routes/user");

dotenv.config();

// database connection
dbconnect();

const port = process.env.PORT; // port no

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// home page load
app.get("/", (req, res) => {
  res.send("Hello");
});

//Api routes
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
