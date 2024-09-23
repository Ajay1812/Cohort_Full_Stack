import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export function CourseTable({ refresh }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/courses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(Array.isArray(response.data.courses) ? response.data.courses : []);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Update the local state to remove the deleted course
      setData((prevData) => prevData.filter((course) => course._id !== courseId));
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

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/courses/${currentCourse._id}`, currentCourse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchInfo(); // Refresh data after update
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [refresh]);

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ background: "#003366" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>ID</TableCell>
                <TableCell style={{ color: "white" }}>Name</TableCell>
                <TableCell style={{ color: "white" }}>Description</TableCell>
                <TableCell style={{ color: "white" }} > Image Link</TableCell>
                <TableCell style={{ color: "white" }}>Published</TableCell>
                <TableCell style={{ color: "white" }}>Price</TableCell>
                <TableCell style={{ color: "white" }}>Edit</TableCell>
                <TableCell style={{ color: "white" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((course, index) => (
                <TableRow key={course._id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                  <TableCell>{course._id}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.imageLink}</TableCell>
                  <TableCell>{JSON.stringify(course.published)}</TableCell>
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
      </div>

      {/* Update Dialog  */}
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
                label="Image Link"
                value={currentCourse.imageLink}
                onChange={(e) => setCurrentCourse({ ...currentCourse, imageLink: e.target.value })}
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdateSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
