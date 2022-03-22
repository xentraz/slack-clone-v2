// React
import React, { useState, useRef } from 'react';
// Styles 
import '../../scss/styles.scss';
// Firebase
import database from '../../firebase';
import firebase from "firebase/compat/app";
import { addDoc, collection, collectionGroup, doc, query, getDocs, where, Timestamp } from 'firebase/firestore';
// Material UI
import SendIcon from '@mui/icons-material/Send';
// Components
import { useStateValue } from '../StateProvider/StateProvider';
import { DateRange } from '@mui/icons-material';
// import { serverTimestamp } from 'firebase/firestore';

function ChatInput({ channelName, channelId }) {
  // console.log('Channel Name', channelName);
  // console.log('Channel Id', channelId);
  // const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  const sendMessage = async( e ) => {
    e.preventDefault();

      // data.forEach((doc) => {
      //   console.log('doc room messages:', doc.data())
      //   if(doc.data().roomAlias === roomId) {
      //     return messages.push(doc.data());
      //   }
      // })

    // const message = database.collection('rooms').doc(channelId).collection('messages');
    // console.log('message:', message);
    const inputMessage = {
      message: input,
      timestamp: Timestamp.fromDate(new Date()),
      user: user.displayName,
      userImage: user.photoURL, 
      roomAlias: channelName,
    }

    console.log('input message', inputMessage);

    try {
      const test =  await addDoc(collection(database, 'messages'), inputMessage);
      console.log('await message test', test)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="chat-input">
      <form className="chat-input-form">
        <input 
        vlaue={input}
        // ref={inputRef}
        className="chat-input-form-text"
        onChange={e => setInput(e.target.value)}
        placeholder={`Message #${channelName?.toLowerCase()}`} 
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