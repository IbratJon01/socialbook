import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';


const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const users = [
    { id: 1, name: 'Foydalanuvchi 1' },
    { id: 2, name: 'Foydalanuvchi 2' }
  ];

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
  };

  const sendMessage = (message) => {
    // Xabarni yuborish logikasi
  };

  const goBack = () => {
    window.history.back();
  };
  return (
    <div>
       <button onClick={goBack}> go back</button>
      <ChatList users={users} onSelectChat={handleSelectChat} />
      {selectedChat && <ChatWindow chatMessages={[]} sendMessage={sendMessage} data={selectedChat} />}
    </div>
  );
};

export default App;