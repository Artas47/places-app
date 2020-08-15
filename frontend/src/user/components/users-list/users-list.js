import React from 'react';
import * as Styled from './users-list.styles';
import UserCard from '../user-card/user-card';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div>
        <h2>Users not found</h2>
      </div>
    );
  }
  return (
    <Styled.UsersList>
      {items.map((user) => {
        return (
          <UserCard
            name={user.name}
            interests={user.interests}
            following={user.following}
            followers={user.followers}
            likes={user.likes}
          />
        );
      })}
    </Styled.UsersList>
  );
};

export default UsersList;
