// src/HomePage.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Typography} from "@mui/material";

Modal.setAppElement('#root'); // Set the root element for accessibility

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
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
        <Typography variant="h3" gutterBottom>
          Bine ați venit pe platforma noastră!
        </Typography>
        <Typography variant="h6" paragraph>
          Platforma noastră conectează utilizatorii ca îngrijitori de copii, persoane care oferă servicii de shadow/insotitor de sprijin și voluntari. Indiferent dacă căutați ajutor sau doriți să oferiți serviciile dumneavoastră, vă facem ușor să găsiți potrivirea perfectă.
        </Typography>
        <Button onClick={goToLogin} variant="contained" color="primary">
          Logare
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
