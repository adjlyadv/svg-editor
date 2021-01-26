import React, { useState } from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";
import '../style/BasicContainer.scss'

const BasicLayout = () => {

  const [currentTool, setCurrenttool] = useState("mouse");

  return(
    <div className="basic-container">
      <ToolbarContainer currentTool={currentTool} set={setCurrenttool}/>
      <EditorContainer />
      <StatusContainer />
    </div>
  )
}

export default BasicLayout
