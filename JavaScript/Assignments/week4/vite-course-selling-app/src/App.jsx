import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/Signin';
import { SignUp } from './components/Signup';
import { Appbar } from './components/Appbar';
import { AddCourse } from './components/AddCourse'
import { GetCourses } from './components/GetCourses'

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <Appbar />
      <Router>
        <Routes>
          <Route path='getcourse' element={<GetCourses />} />
          <Route path='/addcourse' element={<AddCourse />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
