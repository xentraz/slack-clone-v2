import * as React from 'react';
import { useEffect, useState } from 'react';
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

    // const fetchRooms = async () => {
    //   // const response = query(collection(database, 'messages'))
    //   const response = database.collection('messages');

    //   const data = await getDocs(response)
    //   const messages = [];
    //   console.log('roomid >>>', roomId);

    //   data.forEach((doc) => {
    //     console.log('doc room messages:', doc.data())
    //     if(doc.data().roomAlias === roomId) {
    //       return messages.push(doc.data());
    //     }
    //   })
    //    setMessages(messages)

    // }
    // fetchRooms();


    const unSubMessages = database.collection('messages').onSnapshot((snap) => {
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
      unSubMessages();
    }
  }, [roomId])

  console.log('first room details:', roomId);
  console.log("messages:", messages);
  // console.log('roomDetails:', roomDetails);

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
        <ChatInput channelName={roomDetails?.id} channelId={roomId} message/>
      </div>
    </>
  )
}

export default Chat;