import React from 'react';
import { useSelector } from 'react-redux';

const LoggedInStatusLabel = () => {

  const currentUser = useSelector(state => state.settings.user);
  console.log(currentUser);
  let username = currentUser.username;
  let email = currentUser.email;
  
  return (
    <div>
      <h3>Logged In Status:</h3>
      <h2>{username}</h2>
      <h2>{email}</h2>

    </div>

  );
};

export default LoggedInStatusLabel;
