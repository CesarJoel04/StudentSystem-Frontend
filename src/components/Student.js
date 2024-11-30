import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import axios from "axios";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate input fields
      if (!name || !address) {
          console.error("Name and address are required fields.");
          return;
      }

      const student = { name, address };

      console.log("Submitting student data:", student);

      try {
          const response = await axios.post("http://localhost:8080/student/add", student, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true // Similar to `credentials: 'include'` in fetch
          });

          console.log("New student added successfully:", response.data);

          // Reset the form fields after successful submission
          setName('');
          setAddress('');
      } catch (error) {
          if (error.response) {
              console.error("Failed to add student:", error.response.data.message || "Unknown error");
          } else {
              console.error("Failed to add student:", error.message);
          }
      }
  };

  return (
      <Container>
          <Paper elevation={3} style={paperStyle}>
              <h1>Add Student</h1>
              <form onSubmit={handleSubmit}>
                  <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                      label="Address"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary">
                      Submit
                  </Button>
              </form>
          </Paper>
      </Container>
  );
}