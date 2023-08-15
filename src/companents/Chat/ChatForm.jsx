import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Send } from '@mui/icons-material';
const ChatForm = ({ onSubmit, sender, receiver }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sender, receiver, content }); // sender, receiver va contentni yuborish
    setContent('');
  };

  return (
    

   
    
    <form onSubmit={handleSubmit}>
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <Send color="primary" style={{ cursor: 'pointer' }} onClick={handleSubmit} />
          ),
        }}
      />
    </form>
    

  );
};

export default ChatForm;
