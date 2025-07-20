import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button
} from '@mui/material';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    adminCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/stats')
        ]);
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Admin dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? {...u, role: newRole} : u));
    } catch (err) {
      console.error('Role update failed:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Box display="flex" gap={2} mb={4}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Active Today" value={stats.activeToday} />
        <StatCard title="Admins" value={stats.adminCount} />
      </Box>

      {/* Users Table */}
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === 'user' ? (
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => handleRoleChange(user._id, 'admin')}
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleRoleChange(user._id, 'user')}
                    >
                      Make User
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Helper component for stats cards
const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 2, flex: 1 }}>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

export default AdminDashboard;