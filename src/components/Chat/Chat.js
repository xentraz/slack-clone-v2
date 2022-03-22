import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
// import { useSeletor } from 'react-redux';
// Styles
import '../../scss/styles.scss';
// React Router
import { useParams } from "react-router-dom";
// Mterial-UI
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';
// Firebase
import database from '../../firebase';
import { getDoc, getDocs, collectionGroup, query, collection } from 'firebase/firestore'
// Components
import Messages from '../Messages/Messages';
import ChatInput from '../ChatInput/ChatInput';

const Chat = () => {
 const { roomId } = useParams();
 const [roomDetails, setRoomDetails] = useState(null);
 const [messages, setMessages] = useState();
 const chatRef = useRef(null);

  useEffect(() => {
    
    if (roomId) {
      const fetchRoomId = async () => {
        const roomIds = database.collection('rooms').doc(roomId);
        const docSnap = await getDoc(roomIds);

        console.log('new room id test:', docSnap)
        setRoomDetails(docSnap);
      } 
      fetchRoomId();
    }

    const fetchMessages = database.collection('messages').onSnapshot((snap) => {
      const filteredMessages = []
      const data = snap.docs.map((doc) => doc);
      console.log('data ?>>>', data) 
      data.forEach((doc) => {
        if(doc.data().roomAlias === roomId) {
          console.log('doc data', doc.data())
          return filteredMessages.push(doc.data());
        }
      })
      console.log('filteredMessages', filteredMessages)
      setMessages(filteredMessages.sort((a, b) => a.timestamp - (b.timestamp)))
    });

    return () => {
      fetchMessages();
    }
  }, [roomId])

  // Using decoupled code that are not dependent on each other but work off each other.
 
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [roomId, messages])

  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <div className="chat-header-left">
            <h3>
              <strong># {roomId}</strong>  
              <KeyboardArrowDownIcon />
            </h3>
          </div>
          <div className="chat-header-right">
            <p>
              <InfoIcon />
              Details
            </p>
          </div>
        </div>
        <div className="chat-body">
          <Messages messages={messages} />
          <div ref={chatRef} className="chat-body-bottom"></div>
        </div>
        <ChatInput channelName={roomDetails?.id} channelId={roomId} message/>
      </div>
    </>
  )
}

export default Chat;