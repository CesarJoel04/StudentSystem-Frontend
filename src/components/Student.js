import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import axios from "axios";

const StudentComponent = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission for adding a new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, address };

    try {
      const response = await axios.post("http://localhost:8080/student/add", student, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false
      });

      console.log("New student added successfully:", response.data);

      // Reset the form fields after successful submission
      setName('');
      setAddress('');
      fetchStudents();
    } catch (error) {
      if (error.response) {
        console.error("Failed to add student:", error.response.data.message || "Unknown error");
      } else {
        console.error("Failed to add student:", error.message);
      }
    }
  };

  // Handle editing a student by setting the form fields with the student's data
  const handleEdit = async (id) => {
    const student = students.find(student => student.id === id);
    setName(student.name);
    setAddress(student.address);
    setEditId(id);
  };

  // Handle form submission for updating an existing student
  const handleUpdate = async (e) => {
    e.preventDefault();
    const student = { name, address };

    try {
      const response = await axios.put(`http://localhost:8080/student/update/${editId}`, student, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false
      });

      console.log("Student updated successfully:", response.data);
      setName('');
      setAddress('');
      setEditId(null);
      // Refresh the student list
      fetchStudents();
    } catch (error) {
      if (error.response) {
        console.error("Failed to update student:", error.response.data.message || "Unknown error");
      } else {
        console.error("Failed to update student:", error.message);
      }
    }
  };

  // Handle deleting a student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/student/delete/${id}`, {
        withCredentials: false
      });

      console.log("Student deleted successfully");
      // Refresh the student list
      fetchStudents();
    } catch (error) {
      if (error.response) {
        console.error("Failed to delete student:", error.response.data.message || "Unknown error");
      } else {
        console.error("Failed to delete student:", error.message);
      }
    }
  };

  // Fetch the list of students from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/student/getAll");
      setStudents(response.data);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    // Container for the entire component
    <Container>
      {/* Paper component for the form section with elevation and padding */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* Heading that changes based on whether a student is being edited or added */}
        <h1>{editId ? "Edit Student" : "Add Student"}</h1>
        {/* Form for adding or updating a student */}
        <form onSubmit={editId ? handleUpdate : handleSubmit}>
          {/* TextField for entering the student's name */}
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* TextField for entering the student's address */}
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <br />
          {/* Button to submit the form, changes text based on whether editing or adding */}
          <Button type="submit" variant="contained" color="primary">
            {editId ? "Update" : "Submit"}
          </Button>
        </form>
      </Paper>
      {/* Display error message if there is any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* Heading for the list of students */}
      <h1>Students</h1>
      {/* Paper component for the list of students with elevation and padding */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* Map through the students array and display each student */}
        {students.map(student => (
          // Paper component for each student with elevation, margin, and padding
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
            {/* Display student details */}
            Id: {student.id}<br />
            Name: {student.name}<br />
            Address: {student.address}
            {/* Buttons for editing and deleting a student */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="secondary" onClick={() => handleEdit(student.id)} style={{ marginLeft: '10px' }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(student.id)} style={{ marginLeft: '10px' }}>
                Delete
              </Button>
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  ); 
};

export default StudentComponent;