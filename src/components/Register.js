import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanityClient from "../sanityClient";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";

const romanianCounties = [
  'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov', 'Brăila',
  'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați',
  'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș', 'Mehedinți',
  'Mureș', 'Neamț', 'Olt', 'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș',
  'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea', 'București'
];

const userTypes = [
  { title: 'Shadow/ inostitor de sprijin', value: 'shadow' },
  { title: 'Ingrijitor copii/ Bona', value: 'babysitter' },
  { title: 'Voluntar', value: 'voluntary' },
  { title: 'Cautam shadow', value: 'search_shadow' },
  { title: 'Cautam bone', value: 'search_babysitter' },
  { title: 'Cautam voluntari', value: 'search_voluntary' }
];

const statuses = [
  { title: 'Disponibil', value: 'available' },
  { title: 'Indisponibil', value: 'unavailable' }
];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordConfirm: '',
    userType: '',
    county: '',
    picture: null,
    description: '',
    status: '',
    approved: false,
    region: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? (files ? files[0] : null) : value,
    });
  };

  const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
  };

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'Numele este obligatoriu';
      isValid = false;
    }
    if (!formData.lastName) {
      errors.lastName = 'Prenumele obligatoriu';
      isValid = false;
    }
    if (!formData.region) {
      errors.region = 'Localitatea este obligatorie';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email obligatoriu';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Adresa de email invalida';
      isValid = false;
    }
    if (!formData.password) {
      errors.password = 'Parola obligatorie';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Parola trebuie să aibă cel puțin 8 caractere și să includă litere mari, litere mici, cifre și caractere speciale.';
      isValid = false;
    }
    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Parolele nu se potrivesc';
      isValid = false;
    }
    if (!formData.userType) {
      errors.userType = 'Tipul utiliaztorului este obligatoriu';
      isValid = false;
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Numarul de telefon obligatoriu';
      isValid = false;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Numarul este invalid';
      isValid = false;
    }
    if (!formData.county) {
      errors.county = 'Judetul obligatoriu';
      isValid = false;
    }
    if (!formData.description) {
      errors.description = 'Descrierea obligatorie';
      isValid = false;
    }

    if (!formData.status) {
      errors.status = 'Status este obligatoriu';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        // Create a new document in Sanity
        const newUser = await sanityClient.create({
          _type: 'userProfile', // Ensure this matches your Sanity schema
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password, // Store securely in your actual implementation
          county: formData.county,
          userType: formData.userType,
          phoneNumber: formData.phoneNumber,
          description: formData.description,
          status: formData.status,
          approved: false,
          region: formData.region
        });

        if (newUser && newUser._id) {
          navigate(`/user/${newUser._id}`);
        } else {
          console.error('New user ID is missing.');
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
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}
    >
      <Button onClick={() => navigate('/')} color="primary">Inpoi la pagina de start</Button>
      <Typography variant="h6" gutterBottom>
        Inregistrare cont
      </Typography>
      <TextField
        label="Nume"
        variant="outlined"
        fullWidth
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName}
      />

      <TextField
        label="Prenume"
        variant="outlined"
        fullWidth
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName}
      />

      <TextField
        label="Numar de telefon"
        variant="outlined"
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
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
        label="Parola"
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

      <TextField
        label="Confirm Parola"
        variant="outlined"
        fullWidth
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        value={formData.passwordConfirm}
        onChange={handleChange}
        error={Boolean(errors.passwordConfirm)}
        helperText={errors.passwordConfirm}
      />

      <FormControl fullWidth variant="outlined">
        <InputLabel id="userType-label">Tipul utilizatorului</InputLabel>
        <Select
          labelId="userType-label"
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          label="User Type"
          error={Boolean(errors.userType)}
        >
          <MenuItem value="">
            <em>Selecteaza tipul de utilizator</em>
          </MenuItem>
          {userTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.title}
            </MenuItem>
          ))}
        </Select>
        {errors.userType && <Typography color="error">{errors.userType}</Typography>}
      </FormControl>

      <TextField
        label="Localitate"
        variant="outlined"
        fullWidth
        id="region"
        name="region"
        value={formData.region}
        onChange={handleChange}
        error={Boolean(errors.region)}
        helperText={errors.region}
      />


      <FormControl fullWidth variant="outlined">
        <InputLabel id="county-label">Judet</InputLabel>
        <Select
          labelId="county-label"
          id="county"
          name="county"
          value={formData.county}
          onChange={handleChange}
          label="County"
          error={Boolean(errors.county)}
        >
          <MenuItem value="">
            <em>Selecteaza judetul</em>
          </MenuItem>
          {romanianCounties.map((county) => (
            <MenuItem key={county} value={county}>
              {county}
            </MenuItem>
          ))}
        </Select>
        {errors.county && <Typography color="error">{errors.county}</Typography>}
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
          error={Boolean(errors.status)}
        >
          <MenuItem value="">
            <em>Selecteaza statusul</em>
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.title}
            </MenuItem>
          ))}
        </Select>
        {errors.status && <Typography color="error">{errors.status}</Typography>}
      </FormControl>

      <TextField
        label="Descriere"
        variant="outlined"
        fullWidth
        id="description"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? 'Inregistrare...' : 'Creare cont'}
      </Button>
    </Box>
  );
};

export default Register;
