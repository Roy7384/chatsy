/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React, {useState, useEffect} from 'react';

import ChatListItem from './ChatListItem';
import Box from '@mui/material/Box';

import {TextField } from '@mui/material';

export default function Chat({socket, remoteSocketId}) {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  console.log('rerender');
  useEffect(() => {
    if(socket) {
      socket.on('msg', ({msg}) => appendMsg({text: msg, fromPeer: true}));
    }
    
    return () => {
      socket.off('msg');
    }
  }, [socket]);
  
  const appendMsg = (msgObj) => setMessages(prev => [...prev, msgObj]);

  const send = (e) => {
    e.preventDefault();
    appendMsg({text: value, fromPeer: false});
    socket.emit('send-msg', ({msg: value, remoteSocketId}));
    setValue('');
  };

  return (
    <Box css={wrapper}>
      <Box 
        css={msgBox}
      >
        {messages.map((message, i) => <ChatListItem key = {i} text = {message.text} fromPeer = {message.fromPeer}/>)}
      </Box>
      <Box component='form' onSubmit = {(e) => send(e)}>
        <TextField 
          css={textField} 
          value={value}
          multiline
          maxRows={3}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    </Box>
  );
};

const wrapper = css({
  width: '100%',
  height: '75%'
});

const wrapperChildren = css({
  overflowY: 'scroll',
  width: '100%'
});

const msgBox = css(wrapperChildren, {
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  border: '3px solid black',
  padding: '15px'
});

const textField = css(wrapperChildren, {

});