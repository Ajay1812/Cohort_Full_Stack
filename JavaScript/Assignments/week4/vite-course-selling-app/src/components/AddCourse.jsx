import { TextField, Button, Card } from '@mui/material'
import { useState } from 'react'
import { DropDownMenu } from './DropDown'

export function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  return <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1>Add Courses</h1>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>

      <Card style={{ width: "400px", padding: "20px" }} variant="outlined">
        <TextField
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
        />
        <br /> <br />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
        />
        <br /> <br />
        <DropDownMenu
          onChange={(value) => {
            // console.log(`Setting price to: ${value}`); 
            setPrice(value);
          }}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch('http://localhost:3000/admin/courses', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                  title: title,
                  description: description,
                  price: price ? parseInt(price) : null,
                  imageLink: "",
                  published: true
                })
              }).then((res) => {
                res.json()
                  .then((data) => {
                    console.log(data)
                  })
              })
            }}
          >
            Add Course
          </Button>
        </div>
      </Card>
    </div >
  </>
}
