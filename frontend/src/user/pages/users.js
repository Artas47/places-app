import React, { useEffect, useState } from 'react';
import UsersList from '../components/users-list/users-list';
import axios from 'axios';

const Users = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);
  console.log('users', users);
  if (!users.length) {
    return 'no users';
  }
  return <>{<UsersList items={users} />}</>;
};

export default Users;
