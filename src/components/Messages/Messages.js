import React from 'react';
// Styles
import '../../scss/styles.scss';
// Material UI
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Messages = ({messages}) => {  
  return (
    <div className="chat-messages">
      {messages?.map(({id, user, userImage, message, timestamp}) => {
        console.log('date', timestamp);
        return (
          <div className="message" key={id}>
            <div className="message-date">
              <p>{new Date(timestamp)?.toUTCString().slice(0, 16)}<KeyboardArrowDownIcon/></p>
            </div>
            <div className="message-content">
             <img src={userImage} alt=""/>
             <div className="message-content-info">
                <h4>{user} <span className="message-content-info-time">{new Date(timestamp)?.toUTCString().slice(16, 22)}</span> </h4>
                <p>{message}</p>
              </div>
            </div>
          </div>
          )
      })}
      </div>
  )
};

export default Messages;
