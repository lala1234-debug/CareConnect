import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Chip, Button } from '@mui/material';
import sanityClient from '../sanityClient';
import { useParams, useNavigate } from 'react-router-dom';

const UserList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [county, setCounty] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const query = `*[_type == "userProfile" && _id == $userId][0]`;
        const params = { userId };
        const user = await sanityClient.fetch(query, params);
        setUserType(user.userType);
        setCounty(user.county);
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        setError(err);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    if (userType && county) {
      const fetchUsers = async () => {
        try {
          let query = '';
          if (userType === 'shadow') {
            query = `*[_type == "userProfile" && county == $county && userType == "search_shadow" && status == "available" && approved == true]`;
          } else if (userType === 'babysitter') {
            query = `*[_type == "userProfile" && county == $county && userType == "search_babysitter" && status == "available" && approved == true]`;
          } else if (userType === 'voluntary') {
            query = `*[_type == "userProfile" && county == $county && userType == "search_voluntary" && status == "available" && approved == true]`;
          } else if (userType === 'search_shadow') {
            query = `*[_type == "userProfile" && county == $county && userType == "shadow" && status == "available" && approved == true]`;
          } else if (userType === 'search_babysitter') {
            query = `*[_type == "userProfile" && county == $county && userType == "babysitter" && status == "available" && approved == true]`;
          } else if (userType === 'search_voluntary') {
            query = `*[_type == "userProfile" && county == $county && userType == "voluntary" && status == "available" && approved == true]`;
          }
          const params = { county };
          const fetchedUsers = await sanityClient.fetch(query, params);
          setUsers(fetchedUsers);
        } catch (err) {
          console.error('Failed to fetch users:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [userType, county]);

  const displayUserType = (userType) => {
    switch (userType) {
      case 'shadow':
        return 'Shadow';
      case 'babysitter':
        return 'Bona';
      case 'voluntary':
        return 'Voluntar';
      case 'search_shadow':
        return 'Caut shadow';
      case 'Caut bona':
        return 'Searching for Babysitter';
      case 'Caut Voluntar':
        return 'Searching for Voluntary';
      default:
        return 'Unknown Type';
    }
  };


  if (loading) return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>Error: {error.message}</Typography>;

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 0 }}
    >
      <Box
        sx={{
          padding: 3,
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom>
         Lista persoane de interes in {county}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/user/${userId}`)}
        >
          Inapoi la profil
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {users.length > 0 ? (
          users.map((user) => (
            <Box
              key={user._id}
              sx={{
                mb: 3,
                p: 3,
                width: '100%',
                maxWidth: '800px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Numar de telefon: {user.phoneNumber}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {displayUserType(user.userType)} in {user.region}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Descriere: {user.description}
              </Typography>
              <Typography variant="body1">
                Status:
                <Chip
                  label={user.status === 'available' ? 'Disponibil' : 'indisponibil'}
                  color={user.status === 'available' ? 'success' : 'error'}
                  sx={{ marginLeft: 1 }}
                />
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No users found</Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserList;
