import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
// import { PurchasedCourse } from "./PurchasedCourse";

export function SignUpUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {/* {email}
      {password} */}
      <div
        style={{
          paddingTop: "150px",
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "400px", padding: "20px" }} variant="outlined">
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
                fetch("http://localhost:3000/users/signup", {
                  method: "POST",
                  headers: {
                    'Content-Type': "application/json",
                  },
                  body: JSON.stringify({
                    username: email,
                    password: password,
                    purchasedCourses: []
                  })
                })
                  .then((res) => {
                    console.log(res)
                    res.json().then((data) => {
                      localStorage.setItem('token', data.token)
                    });
                  });
              }}
            >
              Signup
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
