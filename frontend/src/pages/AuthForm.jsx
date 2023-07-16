import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function AuthForm(props) {
  const [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectue les actions souhaitées avec les valeurs du formulaire
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 100 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginBottom: 3 }}
        >
          {authMode === "signin" ? "Sign In" : "Sign Up"}
        </Typography>
        {authMode === "signin" ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Not registered yet?{" "}
            <Button color="primary" onClick={changeAuthMode}>
              Sign Up
            </Button>
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Already registered?{" "}
            <Button color="primary" onClick={changeAuthMode}>
              Sign In
            </Button>
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          {authMode === "signup" && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              placeholder="e.g Jane Doe"
              name="username"
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            placeholder="Enter email"
            name="email"
            type="email"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
          />
          {authMode === "signup" && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                placeholder="Company Name"
                name="companyName"
              />
            </>
          )}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ marginTop: 3 }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
