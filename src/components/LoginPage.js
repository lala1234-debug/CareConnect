// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';
import ModalComponent from './ModalComponent';
import Register from './Register';
import RecoverPassword from './RecoverPassword';
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRecoverPasswordModalOpen, setIsRecoverPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const query = `*[_type == "userProfile" && email == $email && password == $password][0]`;
      const params = { email, password };
      const user = await sanityClient.fetch(query, params);

      if (user && user.approved) {
        navigate(`/user/${user._id}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Failed to login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openRecoverPasswordModal = () => {
    setIsRecoverPasswordModalOpen(true);
  };

  const closeRecoverPasswordModal = () => {
    setIsRecoverPasswordModalOpen(false);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Button onClick={() => navigate('/')} color="primary">Inpoi la pagina de start</Button>
            <form onSubmit={handleSubmit}>
              <Box mb={2} sx={{ width: '280px' }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2} sx={{ width: '280px' }}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              {error && (
                <Box mb={2}>
                  <Typography color="error">{error}</Typography>
                </Box>
              )}
              <Button type="submit" fullWidth variant="contained" color="primary">
                Login
              </Button>
            </form>
            <Box mt={2}>
              <Button onClick={openRegisterModal} fullWidth variant="outlined" color="secondary">
                Register
              </Button>
            </Box>
            <Box mt={2}>
              <Button onClick={openRecoverPasswordModal} fullWidth variant="outlined" color="secondary">
                Recover Password
              </Button>
            </Box>
            <ModalComponent isOpen={isRegisterModalOpen} onRequestClose={closeRegisterModal}>
              <Register />
            </ModalComponent>

            <ModalComponent isOpen={isRecoverPasswordModalOpen} onRequestClose={closeRecoverPasswordModal}>
              <RecoverPassword onClose={closeRecoverPasswordModal} />
            </ModalComponent>
      </Box>
    </Container>
  );
};

export default LoginPage;
