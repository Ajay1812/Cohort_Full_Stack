import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Appbar() {
  const navigate = useNavigate()
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 4 }}>
      <div>
        <Typography variant={"h6"}>Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button variant={"contained"} onClick={() => {
            // window.location = "/signup"
            navigate('/signup', { replace: true })
          }}>Signup</Button>
        </div>
        <div>
          <Button variant={"contained"} onClick={() => {
            // window.location = "/signin"
            navigate('/signin', { replace: true })
          }}>Signin</Button>
        </div>
      </div>
    </div>
  );
}
