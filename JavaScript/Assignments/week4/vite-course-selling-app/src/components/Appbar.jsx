import { Typography, Button } from "@mui/material";

export function Appbar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 4 }}>
      <div>
        <Typography variant={"h6"}>Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button variant={"contained"} onClick={() => {
            window.location = "/signup"
          }}>Signup</Button>
        </div>
        <div>
          <Button variant={"contained"} onClick={() => {
            window.location = "/signin"
          }}>Signin</Button>
        </div>
      </div>
    </div>
  );
}
