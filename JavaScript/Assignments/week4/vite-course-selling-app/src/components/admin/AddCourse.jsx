import { TextField, Button, Card } from '@mui/material';
import { useState } from 'react';
import { DropDownMenu } from './DropDown';
import { CourseTable } from './TableData';

export function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [refresh, setRefresh] = useState(false); // New state for refresh

  const handleAddCourse = async () => {
    await fetch('http://localhost:3000/admin/courses', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title,
        description,
        price: price ? parseInt(price) : null,
        imageLink: "",
        published: true
      })
    });
    setRefresh(prev => !prev); // Toggle refresh state to trigger update
    setTitle(''); // Clear input fields
    setDescription('');
    setPrice('');
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Add Courses</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "400px", padding: "20px" }} variant="outlined">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <br /> <br />
          <DropDownMenu
            onChange={(value) => setPrice(value)}
          />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={handleAddCourse} // Use the new handler
            >
              Add Course
            </Button>
          </div>
        </Card>
      </div>
      <br /><br />
      <div style={{ width: "100vw" }}>
        <CourseTable refresh={refresh} /> {/* Pass refresh state */}
      </div>
    </>
  );
}
