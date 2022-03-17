// Components
import React from 'react'
// Styles
import '../../scss/styles.scss';
// React Router
import { useNavigate } from "react-router-dom";
// Firebase
import database from '../../firebase';

function SidebarOption({Icon, title, id, addChannelOption}) {
  const history = useNavigate();

  const selectChannel = () => {
    if (id) {
      history(`/room/:${id}`);
    } else {
      history(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name'); 
    if(channelName) {
      database.collection('rooms').add({
        name: channelName,
      })
    }
  };

  return (
    <>
      <div 
      className='sidebarOption' 
      onClick={addChannelOption ? addChannel : selectChannel}
      >
        {Icon && <Icon className="sidebarOption-icon"/>}
        {Icon 
        ? (
        <h3>{title}</h3>
        ):(
        <h3 className="sidebarOption-channel">
          <span className="sidebarOption-channel-hash">#</span>{title}
        </h3>
        )}
        {/* ^ Reusable and customisable component for channels */}
        {/* ^ if you pass me an icon I want to render the title, if not render the channel title */}
      </div>
    </>
  )
}

export default SidebarOption;

// This is a reusable component for all sidebar options.