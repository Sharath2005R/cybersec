const express = require("express");
const { connectDB } = require("./connection");
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();
const PORT = 3000;

connectDB("mongodb://127.0.0.1:27017/CyberSecurity").then(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.end("Hello");
});

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
