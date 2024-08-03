// src/pages/HowToUsePage.js
import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const HowToUsePage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ padding: 2 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ width: '100%', marginTop: 2 }}
        >
          <Button onClick={() => navigate('/')} color="primary">Inpoi la pagina de start</Button>
          <Typography variant="h4" gutterBottom>
            Cum să folosești aplicația
          </Typography>
          <Typography paragraph variant="h6">
            Aplicația noastră este intuitivă și ușor de utilizat. Urmează pașii de mai jos pentru a începe:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>1. Creează un cont:</strong> Dacă nu ai deja un cont, te rugăm să te înregistrezi pentru a accesa toate funcționalitățile aplicației.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>2. Autentifică-te:</strong> După ce te-ai înregistrat, autentifică-te în aplicație folosind datele tale.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>3. Verifică-ți contul:</strong> După autentificare, vei fi redirecționat către pagina de profil unde vei vedea mesajul „Contul nu este încă aprobat...”. Contul tău va fi aprobat în termen de maxim 2 zile. Vei primi un email de confirmare odată ce contul tău a fost activat.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>4. Accesează lista de persoane de interes:</strong> După aprobarea contului, pe pagina de profil va apărea un buton intitulat „Lista de persoane de interes din județul tău”. Apasă pe acest buton pentru a vizualiza persoanele disponibile în aria ta de interes, inclusiv numele, numărul de telefon, descrierea și localitatea acestora.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5. Contactează-ne:</strong> Pentru alte detalii sau neclarități, te rugăm să ne contactezi la adresa de email <a href="mailto:careconnect197@gmail.com">careconnect197@gmail.com</a>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HowToUsePage;
