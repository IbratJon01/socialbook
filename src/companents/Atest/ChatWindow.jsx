import React from 'react';

const ChatWindow = ({ chatMessages, sendMessage ,data}) => {
  console.log(data);
  return (
    <div>
      <div>
        {chatMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <h1>{data.name}ss</h1>

        <input type="text" />
        <button onClick={() => sendMessage('Message text')}>Yuborish</button>
      </div>
    </div>
  );
};

export default ChatWindow;