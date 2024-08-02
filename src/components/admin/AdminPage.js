import React, { useState, useEffect } from 'react';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import sanityClient from "../../sanityClient";
import { useAuth } from "../AuthContext";

const userTypes = [
  { title: 'Shadow', value: 'shadow' },
  { title: 'Babysitter', value: 'babysitter' },
  { title: 'Voluntary', value: 'voluntary' },
  { title: 'Searching for Shadow', value: 'search_shadow' },
  { title: 'Searching for Babysitter', value: 'search_babysitter' },
  { title: 'Searching for Voluntary', value: 'search_voluntary' },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logoutAdmin } = useAuth();

  useEffect(() => {
    fetchUsers(userTypes[activeTab].value);
  }, [activeTab]);

  const fetchUsers = async (userType) => {
    setLoading(true);
    try {
      const query = `*[_type == "userProfile" && userType == "${userType}"]`;
      const result = await sanityClient.fetch(query);
      setUsers(result);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, userEmail) => {
    try {
      await sanityClient.patch(userId).set({ approved: true }).commit();
      // Update the local state to reflect the approval
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, approved: true} : user
        )
      );
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleBlock = async (userId) => {
    try {
      await sanityClient.patch(userId).set({ approved: false }).commit();
      // Update the local state to reflect the block
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, approved: false } : user
        )
      );
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await sanityClient.delete(userId);
      // Remove the user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const sendEmail = async (to, subject, text) => {
    try {
      await axios.post('/send-email', { to, subject, text });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Button color="primary" onClick={logoutAdmin}>
        Logout
      </Button>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        {userTypes.map((type, index) => (
          <Tab key={index} label={type.title} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box>
            {users.map((user) => (
              <Box
                key={user._id}
                sx={{ mb: 2, p: 2, border: '1px solid gray', borderRadius: '4px' }}
              >
                <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.county}</Typography>
                <Typography>{user.description}</Typography>
                <Typography>Status: {user.status}</Typography>
                {!user.approved ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApprove(user._id, user.email)}
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBlock(user._id)}
                  >
                    Block
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                  sx={{ marginLeft: 2 }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPage;
