import React, { useState, useEffect } from "react";
import { Card, Typography, Button, CircularProgress } from "@mui/material"; // Import CircularProgress
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function GetCourses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/admin/courses', {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const courses = Array.isArray(response.data.courses) ? response.data.courses : [];
      const coursesWithImages = courses.map((course) => {
        if (course.image && course.image.type === 'Buffer') {
          const base64String = btoa(
            new Uint8Array(course.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...course, image: `data:image/jpeg;base64,${base64String}` };
        } else {
          return course;
        }
      });

      setData(coursesWithImages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch courses. Please check your permissions or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
        <Typography variant="h3">Courses</Typography>
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", marginTop: "2.5rem" }}>
          {data.map((course) => (
            <div key={course._id} style={{ flexBasis: "calc(25% - 20px)", boxSizing: "border-box" }}>
              <br />
              <div>
                <Card
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    height: "500px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "20px",
                    gap: "10px",
                  }}
                  variant="outlined"
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={course.image} alt={course.title} style={{ width: '100%', height: 'auto', maxHeight: "300px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h5">{course.title}</Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", textAlign: "center", letterSpacing: 1 }}>
                    <Typography variant="body1">{course.description}</Typography>
                  </div>
                  <div style={{ marginLeft: "1.2rem" }}>
                    <Typography variant="h6">₹{course.price}</Typography>
                  </div>
                  <Button variant="contained" onClick={() => {
                    navigate(`/getcourse/${course._id}`, {
                      replace: true
                    });
                  }}>Buy</Button>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && ( // Optional: Display error message if there's an error
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body1">{error}</Typography>
        </div>
      )}
    </>
  );
}
