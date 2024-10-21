// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt  from 'bcrypt';
import { ensureDBConnected } from "@/lib/dbConnect";
import { Admin } from 'db';
// Admin import issue from 'db' package
// import { Admin } from '../../../../../packages/db/src/index'; // alternative

require('dotenv').config()
const SECRET = process.env.SECRET

type Data = {
  token: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await ensureDBConnected()
  console.log("DB Connected")
  try{
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin already exists", token:"" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }catch (error) {
      console.error("Signup API Error:", error);  // Log the error
      return res.status(500).json({ message: "Internal server error", token:"" });
  }
  
}
