const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require('multer');

require("dotenv").config();
app.use(express.json());
app.use(cors());



// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

// Define MongoDB schemas
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: Buffer, // storing into buffer
  published: Boolean,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const upload = multer();

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // to get the token ['Bearer','token....']
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Authentication failed");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

// Connect to MongoDB
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const SECRET = process.env.SECRET
mongoose.connect(
  `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.fyfyk.mongodb.net/courses`
);

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

app.get('/admin/me', authenticateJwt, async (req, res) => {
    const username = req.user.username; 
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(201).json({ username: admin.username });
    } else {
      res.status(403).json({ message: "Admin not found" });
    }
  } );


app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    // const obj = {username : username , password: password}
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// Create and update courses
app.post("/admin/courses", authenticateJwt,upload.single('image'), async (req, res) => {
  const courseData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.file.buffer,  // Store the image binary data
    published: req.body.published,
  };
  const course = new Course(courseData);
  await course.save();
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: course.id });
});
// get particular course
app.get("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    res.status(201).json({course})
  }else{
    res.status(403).json({message: "Course not found"})
  }
});

// get image
app.get("/admin/courses/image/:courseId", async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course && course.image) {
    res.contentType('image/jpeg'); // Set appropriate content type
    res.send(course.image); // Send the binary data directly
  } else {
    res.status(404).json({ message: "Course not found or no image available" });
  }
});

app.put("/admin/courses/:courseId", authenticateJwt, upload.single('image'), async (req, res) => {
  const courseData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    published: req.body.published,
  };
  if (req.file) {
    courseData.image = req.file.buffer; // Store the new image binary data if provided
  }
  const course = await Course.findByIdAndUpdate(req.params.courseId, courseData, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});


// Deleting the course
app.delete("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await Course.deleteOne({ _id: courseId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/admin/courses", authenticateJwt, async (req, res) => {
  // {} -> i want all course list otherwise we can give condtion like {price : 4999}
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User loggedin successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

// user buy a course
app.post("/users/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
  // .populate() will use to get purchasedCourses from course schema using the ids.
  // if we dont use .populate() it will give us coures of ids purchased by user.
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.json({ message: "user not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
