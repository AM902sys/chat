import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    socket.emit('findAll');
    socket.on('message', msg => setMessages(prev => [...prev, msg]));
    socket.on('allMessages', msgs => setMessages(msgs));
    return () => {
      socket.off('message');
      socket.off('allMessages');
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', { user, text });
    setText('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={user} onChange={e => setUser(e.target.value)} placeholder="User" />
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Message" />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map(msg => (
          <li key={msg._id}>{msg.user}: {msg.text}</li>
        ))}
      </ul>
    </div>
  );
}
