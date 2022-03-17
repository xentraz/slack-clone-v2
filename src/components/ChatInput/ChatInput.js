// React
import React, { useState } from 'react';
// Styles 
import '../../scss/styles.scss';
// Firebase
import database from '../../firebase';
import firebase from '../../firebase';
// import { addDoc } from 'firebase/firestore'
import { doc, collection, addDoc } from 'firebase/firestore';

// Components
import { useStateValue } from '../StateProvider/StateProvider';

function ChatInput({ channelName, channelId }) {
  console.log('Channel Name', channelName);

  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();
  
  const sendMessage = e => {
    e.preventDefault();
    // let data = {
    //   message: input,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   user: user.displayName,
    //   userImage: user.photoURL, 
    // }

    const docRef = doc(database, 'rooms', channelId);
    const colRef = collection(docRef, 'messages');
    console.log('colRef', colRef);
    addDoc(colRef, {
      message: input,
      timestamp: firebase.firestore.FieldValue.server(),
      user: user.displayName,
      userImage: user.photoURL, 
    })
    
    // if(channelId) {
    //   const test = collection(database, 'rooms', channelId, 'messages')
    //   console.log('test:', test)
    //   // .set({
    //   //   message: input,
    //   //   timestamp: firebase.firestore.FieldValue.server(),
    //   //   user: user.displayName,
    //   //   userImage: user.photoURL, 
    //   // })
    //   // .then(() => {
    //   //   console.log("Document was successfully created")
    //   // })
    //   // .catch(err => {
    //   //   console.log("Error", err);
    //   // })
    // }
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