// src/RecoverPassword.js
import React, { useState } from 'react';
import sanityClient from '../sanityClient';
import {Box, Button, TextField, Typography} from "@mui/material";

const RecoverPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement your password recovery logic here
      const query = `*[_type == "userProfile" && email == $email][0]`;
      const params = { email };
      const user = await sanityClient.fetch(query, params);

      if (user) {
        setMessage('Password recovery instructions have been sent to your email.');
      } else {
        setMessage('Email not found.');
      }
    } catch (err) {
      console.error('Failed to recover password:', err);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recover Password
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Recover Password
        </Button>
      </form>
      {message && (
        <Typography color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default RecoverPassword;
