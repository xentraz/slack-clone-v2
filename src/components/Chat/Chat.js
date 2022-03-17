import * as React from 'react';
import { useEffect, useState } from 'react';
// Styles
import '../../scss/styles.scss';
// React Router
import { useParams } from "react-router-dom";
// Mterial-UI
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoIcon from '@mui/icons-material/Info';
// Firebase
import database from '../../firebase';
import { getDocs, collectionGroup, query } from 'firebase/firestore'
// Components
import Messages from '../Messages/Messages';
import ChatInput from '../ChatInput/ChatInput';

const Chat = () => {
 const { roomId } = useParams();
 const [roomDetails, setRoomDetails] = useState(null);
 const [messages, setMessages] = useState();

  useEffect(() => {
    
    if (roomId) {
      database.collection('rooms').onSnapshot(
        (docSnapshot) => {
        docSnapshot.forEach((doc) => {
          // console.log(doc.data())
          return (setRoomDetails(doc.data()))
        })
      })
    }

    const fetchRooms = async () => {
      const response = query(collectionGroup(database, 'messages'))
      // console.log('response:', response)
      const data = await getDocs(response)
      console.log('data:', data)
      const messages = [];
      data.forEach((doc) => {
        console.log('doc:', doc.data())
        if(doc.data().roomAlias.toLowerCase() === roomId) {
          return messages.push(doc.data())
        }
      })
       setMessages(messages)
    }
    fetchRooms();

  }, [roomId])

  console.log('room details:', roomDetails);
  console.log("messages:", messages);
  // Using decoupled code that are not dependent on each other but work off each other.

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
        </div>
        <ChatInput channelName={roomDetails?.name} channelId={roomDetails?.id}/>
      </div>
    </>
  )
}

export default Chat;