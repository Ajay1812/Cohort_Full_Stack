import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from './components/admin/SignIn';
import { SignUp } from './components/admin/SignUp';

import { SignUpUser } from './components/user/SignUpUser';
import { SignInUser } from './components/user/SignInUser';

import { AppbarUser } from './components/user/AppbarUser';
import { Appbar } from './components/admin/Appbar';

import { AddCourse } from './components/admin/AddCourse'
import { GetCourses } from './components/admin/GetCourses'
// import { PurchasedCourse } from './components/PurchasedCourse';

function App() {
  const location = useLocation()
  const isUserRoute = location.pathname.includes('/users/')
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      {isUserRoute ? <AppbarUser /> : <Appbar />}
      <Routes>
        <Route path='getcourse' element={<GetCourses />} />
        <Route path='/addcourse' element={<AddCourse />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/users/signup" element={<SignUpUser />} />
        <Route path="/users/login" element={<SignInUser />} />
        {/* <Route path="/purchasedcourses" element={<PurchasedCourse />} /> */}
      </Routes>
    </div >
  );
}

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
