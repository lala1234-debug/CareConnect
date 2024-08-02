import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import sanityClient from "../../sanityClient";

// Email validation regex
const validateEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
};

// Password validation regex
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
};

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        // Create a new admin document in Sanity
        const newAdmin = await sanityClient.create({
          _type: 'admin',
          name: formData.name,
          email: formData.email,
          password: formData.password,  // Note: Store passwords securely in production
        });

        if (newAdmin && newAdmin._id) {
          // Redirect to admin page or display success message
          navigate(`/admin/user/${newAdmin._id}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 500, mx: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Admin Register
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default AdminRegister;
