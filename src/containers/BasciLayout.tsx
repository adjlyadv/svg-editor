import React, { useState } from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import FunctionContainer from './FunctionContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";
import '../style/BasicContainer.scss'


const BasicLayout = () => {

  const [currentTool, setCurrenttool] = useState("mouse");
  const [currentPathid, setCurrentPathid] = useState(0);

  return(
    <div className="basic-container">
      <ToolbarContainer currentTool={currentTool} set={setCurrenttool}/>
      {
          currentTool.indexOf("mouse")===-1
              ?null
              :<FunctionContainer currentTool={currentTool} set={setCurrenttool}/>
      }
      <EditorContainer currentTool={currentTool} currentPathid={currentPathid} set={setCurrentPathid} />


      <StatusContainer currentPathid={currentPathid}/>

    </div>
  )
}

export default BasicLayout
