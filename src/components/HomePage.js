// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToHowToUse = () => {
    navigate('/how-to-use');
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
        sx={{ padding: 2 }}
      >
        <Typography variant="h3" gutterBottom>
          Bine ați venit pe platforma noastră!
        </Typography>
        <Typography variant="h6" paragraph>
          Platforma noastră conectează utilizatorii ca îngrijitori de copii, persoane care oferă servicii de shadow/însoțitor de sprijin și voluntari. Indiferent dacă căutați ajutor sau doriți să oferiți serviciile dumneavoastră, vă facem ușor să găsiți potrivirea perfectă.
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          width="100%"
          mt={2}
        >
          <Button
            onClick={goToLogin}
            variant="contained"
            color="primary"
            sx={{ margin: 1, width: { xs: '100%', sm: 'auto' } }}
          >
            Logare
          </Button>
          <Button
            onClick={goToRegister}
            variant="contained"
            color="secondary"
            sx={{ margin: 1, width: { xs: '100%', sm: 'auto' } }}
          >
            Creeaza cont
          </Button>
          <Button
            onClick={goToHowToUse}
            variant="contained"
            color="info"
            sx={{ margin: 1, width: { xs: '100%', sm: 'auto' } }}
          >
            Cum se folosește aplicatia
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
