import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <div
        style={{
          paddingTop: "150px",
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "400px", padding: "20px" }} variant="outlined">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <br /> <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" variant="contained" onClick={() => {
              fetch('http://localhost:3000/admin/login', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  username: email,
                  password: password
                },
              })
                .then((res) => {
                  res.json()
                    .then((data) => {
                      if (data.token) {
                        localStorage.setItem('token', data.token)
                        // console.log(data)
                        navigate('/getcourse')
                      }
                      else {
                        alert('Invalid credentials');
                      }
                    })
                })
            }}>
              Signin
            </Button>
          </div>
        </Card>
      </div>
    </div >
  );
}
