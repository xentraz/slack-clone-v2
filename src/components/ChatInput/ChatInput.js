// React
import React, { useState } from 'react';
// Styles 
import '../../scss/styles.scss';
// Firebase
import database from '../../firebase';
import firebase from "firebase/compat/app";
// import { add } from 'firebase/firestore';

// Components
import { useStateValue } from '../StateProvider/StateProvider';

function ChatInput({ channelName, channelId }) {
  console.log('Channel Name', channelName);

  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  
  const sendMessage = e => {
    e.preventDefault();

    const message = database.collection('rooms').doc(channelId).collection('messages');
    const time = {seconds: Date.now(), nanoseconds: 0};
    const inputMessage = {
      message: input,
      timestamp: new firebase.firestore.Timestamp(time),
      user: user.displayName,
      userImage: user.photoURL, 
    }
    console.log('inputMessage:',inputMessage );
    message.add(inputMessage);
  }

  return (
    <div className="chatInput">
      <form>
        <input 
        vlaue={input}
        onChange={e => setInput(e.target.value)}
        placeholder={`Message ${channelName?.toLowerCase()}`} 
        />
        <button type="submit" onClick={sendMessage}>SEND</button>
      </form>
    </div>
   )
};

export default ChatInput;