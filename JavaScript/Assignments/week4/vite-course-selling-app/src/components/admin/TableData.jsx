import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // Import the SearchIcon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function CourseTable({ refresh }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to handle filtered data
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const fetchInfo = async () => {
    setLoading(true); // Start loader when fetching courses
    try {
      const response = await axios.get("http://localhost:3000/admin/courses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const courses = Array.isArray(response.data.courses) ? response.data.courses : [];
      const coursesWithImages = await Promise.all(courses.map(async (course) => {
        const image = await fetchImage(course._id);
        return { ...course, image };
      }));
      setData(coursesWithImages);
      setFilteredData(coursesWithImages); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
    setLoading(false); // Stop loader once the courses are fetched
  };

  const fetchImage = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/courses/image/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'arraybuffer', // Set to arraybuffer to handle binary data
      });

      // Convert binary data to Base64
      const base64String = btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      return base64String;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData((prevData) => prevData.filter((course) => course._id !== courseId));
      setFilteredData((prevData) => prevData.filter((course) => course._id !== courseId)); // Update filtered data
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateOpen = (course) => {
    setCurrentCourse(course);
    setOpen(true);
  };

  const handleUpdateClose = () => {
    setOpen(false);
    setCurrentCourse(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentCourse({ ...currentCourse, image: file });
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', currentCourse.title);
      formData.append('description', currentCourse.description);
      formData.append('price', currentCourse.price);
      if (currentCourse.image) {
        formData.append('image', currentCourse.image);
      }

      await axios.put(`http://localhost:3000/admin/courses/${currentCourse._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchInfo(); // Refresh data after update
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the data based on the search term
    const filteredCourses = data.filter((course) =>
      course.title.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value) ||
      course._id.includes(value)
    );
    setFilteredData(filteredCourses);
  };

  useEffect(() => {
    fetchInfo(); // Fetch course data when component mounts or refresh changes
  }, [refresh]);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      {/* Search Bar */}
      <TextField
        label="Search Courses"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', width: '60%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <br /> <br />

      <div style={{ width: "80vw" }}>
        {loading ? ( // Show loading only while fetching courses initially
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ background: "#003366" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>ID</TableCell>
                  <TableCell style={{ color: "white" }}>Name</TableCell>
                  <TableCell style={{ color: "white" }}>Description</TableCell>
                  <TableCell style={{ color: "white" }}>Image</TableCell>
                  <TableCell style={{ color: "white" }}>Published</TableCell>
                  <TableCell style={{ color: "white" }}>Price</TableCell>
                  <TableCell style={{ color: "white" }}>Edit</TableCell>
                  <TableCell style={{ color: "white" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((course, index) => (
                  <TableRow key={course._id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                    <TableCell>{course._id}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                      {course.image ? (
                        <img
                          src={`data:image/jpeg;base64,${course.image}`}
                          alt={course.title}
                          style={{ width: '50px', height: '50px' }}
                        />
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </TableCell>
                    <TableCell>{course.published ? "Yes" : "No"}</TableCell>
                    <TableCell>₹{course.price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleUpdateOpen(course)}>
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => handleDelete(course._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleUpdateClose}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          {currentCourse && (
            <>
              <TextField
                label="Title"
                value={currentCourse.title}
                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={currentCourse.description}
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={currentCourse.price}
                onChange={(e) => setCurrentCourse({ ...currentCourse, price: e.target.value })}
                fullWidth
                margin="normal"
              />
              {/* File input for image upload */}
              <input
                type="file"
                onChange={handleFileChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdateSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
