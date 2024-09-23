const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors())
const SECRET = "QWsaxdwafhgqwWSDsad"

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

// Define MongoDB schemas
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// Define mongoose models
const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // to get the token ['Bearer','token....']
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Authentication failed')
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).send('Authentication failed')
  }
}

// Connect to MongoDB
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.fyfyk.mongodb.net/courses`)

// Admin routes
// using then and pass the callback function to further operations
// app.post('/admin/signup', (req, res) => {
//   const {username, password} = req.body
//   function callback(admin){
//     if (admin){
//       res.status(403).json({message: "Admin already exists"})
//     } else{
//       // const obj = {username : username , password: password}  
//       const newAdmin = new Admin({username, password})
//       newAdmin.save()
//       const token = jwt.sign({username, role: "admin"}, SECRET, {expiresIn:"1h"})
//       res.json({message: "Admin created successfully", token})
//     }
//   }
//   Admin.findOne({username}).then(callback)
// });

app.post('/admin/signup', async (req, res) => {
  const {username, password} = req.body
  const admin = await Admin.findOne({username})
  if (admin){
    res.status(403).json({message: "Admin already exists"})
  } else{
    // const obj = {username : username , password: password}  
    const newAdmin = new Admin({username, password})
    await newAdmin.save()
    const token = jwt.sign({username, role: "admin"}, SECRET, {expiresIn:"1h"})
    res.json({message: "Admin created successfully", token})
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers
  const admin = await Admin.findOne({username , password})
  if (admin){
    const token = jwt.sign({username, role: "admin"}, SECRET, {expiresIn:"1h"})
    res.status(200).json({message: "Logged in successfully", token})
  } else{
    res.status(403).json({message: "Invalid username or password"})
  }
});

// Create and update courses
app.post('/admin/courses', authenticateJwt ,async (req, res) => {
  const course = new Course(req.body)
  await course.save()
  res.status(201).json({message: "Course created successfully", courseId: course.id})
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true})
  if (course){
    res.json({message: "Course updated successfully"})
  } else{
    res.status(404).json({message: "Course not found"})
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  // {} -> i want all course list otherwise we can give condtion like {price : 4999}
  const courses = await Course.find({}) 
  res.json({courses})

});

// User routes
app.post('/users/signup', async(req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username})
  if (user){
    res.status(403).json({message:"User already exists"})
  }else{
    const newUser = new User({username, password})
    await newUser.save()
    const token = jwt.sign({username, role: "user"}, SECRET, {expiresIn:"1h"})
    res.json({message: "User created successfully", token})
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers
  const user = await User.findOne({username, password})
  if (user){
    const token = jwt.sign({username, role: "user"}, SECRET, {expiresIn:"1h"})
    res.json({message: "User loggedin successfully", token})
  } else{
    res.status(403).json({message: "Invalid username or password"})
  }
});

app.get('/users/courses',authenticateJwt, async (req, res) => {
  const courses = await Course.find({published: true}) 
  res.json({courses})
});

// user buy a course
app.post('/users/courses/:courseId', authenticateJwt ,async(req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (course){
    const user = await User.findOne({username: req.user.username})
    if (user){
      user.purchasedCourses.push(course)
      await user.save()
      res.json({message: "Course purchased successfully"})
    }else{
      res.json({message: "User not found"})
    }
  } else{
    res.status(404).json({message: "Course not found"})
  }
});

app.get('/users/purchasedCourses',authenticateJwt,async(req, res) => {
  // .populate() will use to get purchasedCourses from course schema using the ids.
  // if we dont use .populate() it will give us coures of ids purchased by user. 
  const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
  if (user){
    res.json({purchasedCourses: user.purchasedCourses || []})
  }else{
    res.json({message: "user not found"})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
