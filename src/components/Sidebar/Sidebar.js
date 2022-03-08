// Components
import React, { useEffect, useState } from 'react';
import SidebarOption from '../sidebarOption/sidebarOption';
// firebase
import db from '../../firebase';
// Styles
import './sidebar.scss';
// Material-UI
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';



function Sidebar() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // run (once) this code when the compoennts (sidebar) loads
    // runs only once because the dependancies in the array
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      })))
    ))
      // docs.map loops over each of the documents 
      // (for every doc you iterate over, return an object (), 
      // which will be set into the channels variable)
      // access the rooms collection in firebase and set the state to the snapshot
    
      // take a live snapshot of the collection(rooms)
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-info">
          <h2>Xentraz Tech</h2>
          <h3>
            {/* Status */}
            <FiberManualRecordIcon className="statusIcon"/> Emma Thurmer
          </h3>
        </div>
        {/* Edit Icon */}
        <CreateIcon className="editIcon" />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption title="Youtube" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr/>
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr/>
      <SidebarOption Icon={AddIcon} addChannelOption="" title="Add Channel" />
      {/* Connect to dB and list all the channels */}
      {/* <SidebarOption/> */}
      {channels.map(channel => (
        <SidebarOption key={channel.id} title={channel.name} />
      ))}
    </div>
  )
}

export default Sidebar;

// Collection = an array of stuff
// Database > collection > documents > data (fields)
// Adding a field to the document = relational database 
// Data field collection will be the structure of a message 
// (message, user, userImage and timestamp)
// Messages is part of rooms and can contain as many collections as you want