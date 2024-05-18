import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import { generateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExist = await User.find({ email });

    if (!userExist) {
      return res.send("user already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    if (!newUser) {
      return res.send("user not created");
    }

    const token = generateToken(email);
    res.send(token);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Logged in!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }

};

export default {signup,signin}