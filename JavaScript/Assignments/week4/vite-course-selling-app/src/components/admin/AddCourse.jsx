import { TextField, Button, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { DropDownMenu } from './DropDown';
import { CourseTable } from './TableData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddCourse = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price ? parseInt(price) : null);
    formData.append('published', true);
    if (file) {
      formData.append('image', file);
    }

    await fetch('http://localhost:3000/admin/courses', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Do not set Content-Type; the browser will set it automatically for FormData
      },
      body: formData
    });

    setRefresh(prev => !prev); // Toggle refresh state to trigger update
    setTitle(''); // Clear input fields
    setDescription('');
    setPrice('');
    setFile(null); // Clear the file input
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <Typography variant='h4'>Add Courses</Typography>
      </div>
      <br /><br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "400px", padding: "20px", border: "1px solid black", borderRadius: "20px" }} variant="outlined">
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

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            style={{ display: 'none' }} // Hide the input
            onChange={handleFileChange} // Add file input handling
          />

          {/* Label wraps the button to trigger file input */}
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                bgcolor: '#333',
                color: 'white',
              }}
            >
              Upload Image
            </Button>
          </label>
          <br /><br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={handleAddCourse} // Use the new handler
              sx={{
                bgcolor: 'primary.dark',
                color: 'white',
              }}
            >
              Add Course
            </Button>
          </div>
        </Card>
      </div >
      <br /><br />
      <div style={{ width: "100vw" }}>
        <CourseTable refresh={refresh} /> {/* Pass refresh state */}
      </div>
    </>
  );
}
