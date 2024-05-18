import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.SE;

const generateToken = (email) => {
  return jwt.sign({ data: email, succes: true }, secret_key, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;