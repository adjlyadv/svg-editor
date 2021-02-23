import React, { useState } from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import FunctionContainer from './FunctionContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";
import '../style/BasicContainer.scss'


const BasicLayout = () => {

  const [currentTool, setCurrenttool] = useState("mouse");

  return(
    <div className="basic-container">
      <ToolbarContainer currentTool={currentTool} set={setCurrenttool}/>
      {
          currentTool.indexOf("mouse")===-1
              ?null
              :<FunctionContainer currentTool={currentTool} set={setCurrenttool}/>
      }
      <EditorContainer currentTool={currentTool} />


      <StatusContainer />

    </div>
  )
}

export default BasicLayout
