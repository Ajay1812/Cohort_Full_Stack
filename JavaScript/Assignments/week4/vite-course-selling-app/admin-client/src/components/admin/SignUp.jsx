import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          paddingTop: "150px",
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h4"} >
          Welcome to Coursera!
        </Typography>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "400px", padding: "20px", border: "1px solid black", borderRadius: "20px", boxShadow: "5.3px 10.6px 10.6px hsl(0deg 0% 0% / 0.34)" }} variant="outlined">
          <br />
          <TextField
            onChange={(e) => {
              // console.log(e)
              setEmail(e.target.value)
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              // console.log(e)
              setPassword(e.target.value)
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br /> <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                fetch("http://localhost:3000/admin/signup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: email,
                    password: password,
                  }),
                }).then((res) => {
                  res.json().then((data) => {
                    localStorage.setItem('token', data.token)
                    navigate('/signin')
                  });
                });
              }}
            >
              Signup
            </Button>
          </div>
        </Card>
      </div>
    </div >
  );
}