import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";

export function CourseDetails() {
  const { courseId } = useParams();
  const [data, setData] = useState({});
  const [imageSrc, setImageSrc] = useState("");

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const fetchImage = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/courses/image/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );

      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchImage(courseId);
  }, [courseId]);

  return (
    <div style={{ bottom: 1 }}>
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
          {/* Use the fetched image */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={data.title}
              style={{ width: "100%", height: "auto", maxHeight: "300px" }}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">{data.title}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          <Typography variant="body1">{data.description}</Typography>
        </div>
        <div style={{ marginLeft: "1.2rem" }}>
          <Typography variant="h6">₹{data.price}</Typography>
        </div>
        <Button variant="contained">Buy</Button>
      </Card>
    </div>
  );
}
