const User = require("../model/users");

async function createNewUser(req, res) {
  try {
    await User.create(req.body);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("Error in creating user", err);
    return res.status(500).json({ message: "Error in creating user" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      console.log("Error in finding user");
      return res.status(404).json({ message: "No such user exists" });
    }
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    console.log("Internal server error", err);
    return res.status(500).json({ message: "Internal server problem" });
  }
}

module.exports = {
  createNewUser,
  loginUser,
};
