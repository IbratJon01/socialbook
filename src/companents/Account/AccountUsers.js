import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
function AccountUsers(following ) {
  const location = useLocation();
  const { user } = location.state;

  // Use the `following` object to display the relevant user's information

  return (
    <div>
      <h1>Account Users</h1>
      <p>Username: {following.userName}</p>
      {/* Display the user's information here */}
    </div>
  );
}

export default AccountUsers;