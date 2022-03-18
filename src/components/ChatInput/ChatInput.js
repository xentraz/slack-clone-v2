// React
import React, { useState } from 'react';
// Styles 
import '../../scss/styles.scss';
// Firebase
import database from '../../firebase';
import firebase from "firebase/compat/app";
// Material UI
import SendIcon from '@mui/icons-material/Send';
// Components
import { useStateValue } from '../StateProvider/StateProvider';
import { DateRange } from '@mui/icons-material';
// import { serverTimestamp } from 'firebase/firestore';

function ChatInput({ channelName, channelId }) {
  console.log('Channel Name', channelName);

  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  
  const sendMessage = e => {
    e.preventDefault();

    const message = database.collection('rooms').doc(channelId).collection('messages');
    const serverTimestamp = ((new Date()), (new window.Date()));
    // const time = ({seconds: Date.now(), nanoseconds: 0 });
    const inputMessage = {
      message: input,
      timestamp: new firebase.firestore.Timestamp(serverTimestamp),
      user: user.displayName,
      userImage: user.photoURL, 
    }
    console.log('inputMessage:',inputMessage );
    message.add(inputMessage);
  }

  return (
    <div className="chat-input">
      <form className="chat-input-form">
        <input 
        vlaue={input}
        className="chat-input-form-text"
        onChange={e => setInput(e.target.value)}
        placeholder={`Message ${channelName?.toLowerCase()}`} 
        />
        <button 
        type="submit" 
        className="chat-input-form-btn"
        onClick={sendMessage}><SendIcon/>
        </button>
      </form>
    </div>
   )
};

export default ChatInput;