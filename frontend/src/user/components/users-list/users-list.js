import React from 'react';
import * as Styled from './users-list.styles';
import UserCard from '../user-card/user-card';
import Fade from '../../../shared/components/fade-animation/fade';

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
          <Fade in={true} classNames='fade'>
            <UserCard
              name={user.name}
              interests={user.interests}
              following={user.following}
              followers={user.followers}
              likes={user.likes}
              image={user.image}
            />
          </Fade>
        );
      })}
    </Styled.UsersList>
  );
};

export default UsersList;
