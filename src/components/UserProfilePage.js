import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import sanityClient from '../sanityClient';
import { useAuth } from './AuthContext';

const UserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const query = `*[_type == "userProfile" && _id == $userId][0]`;
        const params = { userId };
        const user = await sanityClient.fetch(query, params);
        setUser(user);
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setFieldValue(value);
  };

  const handleSave = async (field) => {
    try {
      const updatedUser = { ...user, [field]: fieldValue };
      await sanityClient.patch(user._id).set({ [field]: fieldValue }).commit();
      setUser(updatedUser);
      setEditingField(null);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await sanityClient.patch(user._id).set({ status: newStatus }).commit();
      setUser((prevState) => ({ ...prevState, status: newStatus }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setFieldValue('');
  };

  const handleOpenUserList = () => {
    navigate(`/user-list/${userId}`);
  };

  if (!user) return <div>Loading user...</div>;

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
        <Button variant="outlined" color="primary" onClick={logout} sx={{ marginBottom: 2 }}>
          Logout
        </Button>

        <Typography variant="h4" gutterBottom>
          Profil Utilizator
        </Typography>

        <Box sx={{ width: '100%', maxWidth: 600 }}>
          {['firstName', 'lastName', 'email', 'phoneNumber', 'description'].map((field) => (
            <Box key={field} sx={{ marginBottom: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                  {field === 'firstName' ? 'Nume' :
                    field === 'lastName' ? 'Prenume' :
                      field === 'email' ? 'Email' :
                        field === 'phoneNumber' ? 'Număr de telefon' :
                          field === 'description' ? 'Descriere' : ''}
                </Typography>
                {editingField === field ? (
                  <Box display="flex" alignItems="center">
                    {field === 'description' ? (
                      <TextareaAutosize
                        minRows={3}
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        onBlur={() => handleSave(field)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSave(field);
                        }}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        type={field === 'email' ? 'email' : 'text'}
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        onBlur={() => handleSave(field)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSave(field);
                        }}
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      />
                    )}
                    <IconButton onClick={handleCancelEdit} sx={{ marginLeft: 1 }}>
                      <MdCancel />
                    </IconButton>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Typography>{field === 'description' ? user[field] : user[field]}</Typography>
                    <IconButton onClick={() => handleEdit(field, user[field])} sx={{ marginLeft: 1 }}>
                      <FaEdit />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          ))}

          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={user.status}
                onChange={handleStatusChange}
                label="Status"
                sx={{ width: '100%' }}
              >
                <MenuItem value="available">Disponibil</MenuItem>
                <MenuItem value="unavailable">Indisponibil</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {user.approved ? (
            <Button variant="contained" color="primary" onClick={handleOpenUserList}>
              Lista persoane din aria de interes
            </Button>
          ) : (
            <Typography color="error" variant="body1" sx={{ marginTop: 2 }}>
              Contul tău va fi aprobat în termen de maxim 2 zile. Veti primi un email de confirmare odată ce contul va fi activat.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
