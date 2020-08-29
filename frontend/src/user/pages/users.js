import React, { useEffect, useState } from 'react';
import UsersList from '../components/users-list/users-list';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/spinner/spinner';
import Modal from '../../shared/components/modal/modal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { sendRequest, isLoading, error } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users',
          'GET'
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const renderUsersContent = () => {
    if (isLoading) {
      return <Spinner className={['centered', 'color-white']} />;
    } else if (!users.length) {
      return <div>No users</div>;
    } else {
      return <UsersList items={users} />;
    }
  };

  return <div>{renderUsersContent()}</div>;
};

export default Users;
