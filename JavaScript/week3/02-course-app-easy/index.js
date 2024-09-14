const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req,res,next)=>{
  const {username, password} = req.headers
  const admin = ADMINS.find(a => a.username === username && a.password === password)
  if (admin){
    next()
  }
  else{
    res.status(403).json({message: "Admin Authentication Failed"})
  }
}

const userAuthentication = (req,res,next)=>{
  const {username, password} = req.headers
  const user = USERS.find(u => u.username === username && u.password === password)
  if (user){
    req.user = user
    next()
  }
  else{
    res.status(403).json({message: "User Authentication Failed"})
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body
  const adminAlreadyExists = ADMINS.find(a => a.username === admin.username)
  if (adminAlreadyExists){
    res.status(403).send("Admin Already Exists.")
  }
  else{
    ADMINS.push(admin)
    res.status(201).json({ message: 'Admin created successfully' })
  }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
    res.status(200).json({ message: 'Logged in successfully' });
})

app.post('/admin/courses', adminAuthentication,(req, res) => {
  const course = req.body
  course.id = Date.now()
  COURSES.push(course)
  res.json({ message: 'Course created successfully', courseId: course.id })
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id === courseId)
  // if (course){
  //   const updateCourse = {
  //     courseId: course[courseId],
  //     title: req.body.title,
  //     description: req.body.description,
  //     price : req.body.price,
  //     imageLink: req.body.imageLink,
  //   }
  // course[courseId] = updateCourse;
  if (course){
    Object.assign(course, req.body)
    res.json({ message: 'Course updated successfully.' })
  }
  else{
    res.json({message:"Course not found."})
  }
});

app.get('/admin/courses', adminAuthentication,(req, res) => {
  res.json({courses: COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // const user = {...req.body, purchasedCourses: []}
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: []
  }
  const userAlreadyExists = USERS.find(u => u.username === user.username && u.password === user.password)
  if (userAlreadyExists){
    res.status(403).send("User Already Exists.")
  }
  else{
    USERS.push(user)
    res.status(201).json({ message: 'User created successfully' })
  }
});

app.post('/users/login', userAuthentication, (req, res) => {
  res.status(200).json({ message: 'Logged in successfully' });
});

app.get('/users/courses', userAuthentication, (req, res) => {
  let filteredCourses = []
  for (let i =0 ; i< COURSES.length; i++){
    if (COURSES[i].published){
      filteredCourses.push(COURSES[i])
    }
  }
  // res.status(200).json({courses : COURSES.filter(c => c.published)})
  res.status(200).json({courses : filteredCourses})
});

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found or not available' });
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  // const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
  // We need to extract the complete course object from COURSES
  // which have ids which are present in req.user.purchasedCourses
  let purchasedCourseIds = req.user.purchasedCourses
  let purchasedCourses = []
  for (let i = 0; i< COURSES.length; i++){
    if (purchasedCourseIds.indexOf(COURSES[i].id !== -1)){
      purchasedCourses.push(COURSES[i])
    }
  }
  res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
