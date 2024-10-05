import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
import { signupInput, loginInput } from '@ajay_o1/common';
const router = express.Router();


// pm2 (process managers) - if your backend down any reason it went up automatically
// npm i -g pm2 -> pm2 start dist/index.js (start server)
// pm2 kill (kill process)

  router.post('/signup', async (req, res) => {
    let signupProps = signupInput.safeParse(req.body)
    if (!signupProps.success ){
      res.send(411).json({
        message: "error while parsing."
      })
      return 
    }
    // const { username, password } = req.body
    const username = signupProps.data.username;
    const password  = signupProps.data.password;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });

  router.post('/login', async (req, res) => {
    let loginProps = loginInput.safeParse(req.body)
    if(!loginProps.success){
      res.send(411).json({
        message:"error while parsing"
      })
      return
    }
    // const { username, password } = req.body;
    const username = loginProps.data.username
    const password = loginProps.data.password
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });


    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers['userId'];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

export default router;
