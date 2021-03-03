import React, { useState } from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import FunctionContainer from './FunctionContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";
import '../style/BasicContainer.scss'
import { UIStore } from '../stores/UIStore';


const BasicLayout = () => {

  const [currentTool, setCurrenttool] = useState("mouse");
  const handleToolChange = (toolName: string) => {
    UIStore.setCurrentTool(toolName);
    setCurrenttool(toolName)
  }

  return(
    <div className="basic-container">
      <ToolbarContainer currentTool={currentTool} set={handleToolChange}/>
      {
        currentTool.indexOf("mouse")===-1
          ? null
          : <FunctionContainer currentTool={currentTool} set={handleToolChange} id="mouse"/>
      }
      {
        currentTool.indexOf("pen")===-1
          ? null
          : <FunctionContainer currentTool={currentTool} set={handleToolChange} id="pen"/>
      }
      <EditorContainer currentTool={currentTool} />


      <StatusContainer />

    </div>
  )
}

export default BasicLayout
