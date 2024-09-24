import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Courses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/courses/', {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log('Response data:', response.data.courses);
      setData(Array.isArray(response.data.courses) ? response.data.courses : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">Courses</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
        {
          data.map((course) => {
            return (
              <div key={course.id} style={{ flexBasis: "calc(25% - 20px)", boxSizing: "border-box" }}>
                <br />
                <div>
                  <Card
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      height: "400px", // Set a fixed height for the cards
                      // padding: "10px", // Padding inside the card
                      // margin: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Evenly space items within the card
                      borderRadius: "20px",
                      gap: "10px",
                    }}
                    variant="outlined"
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={course.imageLink} alt={course.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Typography variant="h5">{course.title}</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", letterSpacing: 1, overflow: "hidden", textOverflow: "ellipsis", height: "70px" }}>
                      <Typography variant="body1">{course.description}</Typography>
                    </div>
                    <div style={{ marginLeft: "1.2rem" }}>
                      <Typography variant="h6">₹{course.price}</Typography>
                    </div>
                    <Button variant="contained" onClick={() => {
                      navigate('/purchasedcourses', {
                        state: { courseId: course._id },
                        replace: true
                      });
                    }}>Buy</Button>
                  </Card>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
}
