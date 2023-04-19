import React from 'react';
import { useSelector } from 'react-redux';

const LoggedInStatusLabel = () => {

  const currentUser = useSelector(state => state.settings.user);
  console.log(currentUser);
  return (
    <div>
      <h2>Logged In Status Label:</h2>
      <h1>{currentUser.username}</h1>

    </div>

  );
};

export default LoggedInStatusLabel;
