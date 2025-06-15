import express from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.mjs';
import User from '../model/users.mjs';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config(); // ✅ Load environment variables from .env file

const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  try {
    const { user_id,username, email, password } = req.body;

    if (  !user_id ||!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Hash password with 10 salt rounds (matching the stored password hash)
    const hashedPassword = await bcrypt.hash(password, 10);  // Use 10 rounds here
    console.log("🔹 Hashed Password to Store:", hashedPassword);

    // ✅ Store hashed password in database
    const newUser = await User.create({
      user_id,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in Register API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user_id: user.user_id }, "jon", { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


userRouter.get('/', auth, async (req, res) => {
  try {
      console.log("User ID from token:", req.user.user_id);  // Debugging step

      const user = await User.findByPk(req.user.user_id, { 
          attributes: { exclude: ['password'] } 
      });

      console.log("User fetched from DB:", user); // Check if user is actually fetched

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
  }
});



  


export default userRouter;

