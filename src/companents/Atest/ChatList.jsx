import React from 'react';

const ChatList = ({ users, onSelectChat }) => {
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <button onClick={() => onSelectChat(user.id)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;