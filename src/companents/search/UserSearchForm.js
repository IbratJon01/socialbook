// UserSearchForm.js

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import debounce from 'lodash.debounce';

const UserSearchForm = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = debounce(() => {
    onSearch(username);
  }, 300);

  const handleChange = (e) => {
    setUsername(e.target.value);
    handleSearch();
  };

  return (
    <div>
      <TextField
        label="Foydalanuvchi nomini kiriting"
        value={username}
        onChange={handleChange}
      />
      {/* <Button variant="contained" onClick={handleSearch}>
        Qidirish
      </Button> */}
    </div>
  );
};

export default UserSearchForm;
