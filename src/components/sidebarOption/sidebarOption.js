// Components
import React from 'react'
// Styles
import './sidebarOption.scss';
// Material-UI

function sidebarOption({Icon, title}) {
  return (
    <div className='sidebarOption'>
      {Icon && <Icon className="sidebarOption-icon"/>}
      {Icon 
      ? (
      <h3>{title}</h3>
      ):(
      <h3 className="sidebarOption-channel">
        <span className="sidebarOption-channel-hash">#</span>{title}
      </h3>)}
      {/* ^ Reusable and customisable component for channels */}
      {/* ^ if you pass me an icon I want to render the title, if not render the channel title */}
    </div>
  )
}

export default sidebarOption;

// This is a reusable component for all sidebar options.