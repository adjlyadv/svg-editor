import React from 'react';
import { exportToSvg } from '../utils/importAndExport';
import '../style/ToolbarContainer.scss'
import circle from '../asset/circle.svg'
import pen from '../asset/pen.svg'
import mouse from '../asset/mouse.svg'
import download from '../asset/download.svg'
import rectangle from '../asset/rectangle.svg'

interface Props{
  currentTool:string;
  set:(arg0: string)=>void;
}

const ToolbarContainer:  React.FC<Props> = (props) => {

  function handleClick(e:any){
    props.set(e.target.id)
  }

  return (
    <div className="toolbar">
        <div className="toolitem" onClick={handleClick} >
            <img className={props.currentTool.indexOf("mouse")!==-1?"itmeIconselect":"itmeIcon"} id="mouse"  alt="mouse" src={mouse}/>
        </div>
        <div className="toolitem" onClick={handleClick}>
            <img className={props.currentTool==="circle"?"itmeIconselect":"itmeIcon"} id="circle" alt="circle" src={circle}/>
        </div>
        <div className="toolitem" onClick={handleClick}>
            <img className={props.currentTool==="rectangle"?"itmeIconselect":"itmeIcon"} id="rectangle" alt="rectangle" src={rectangle}/>
        </div>
        <div className="toolitem" onClick={handleClick}>
            <img className={props.currentTool.indexOf("pen")!==-1?"itmeIconselect":"itmeIcon"} id="pen" alt="pen" src={pen}/>
        </div>
        <div className="toolitem" onClick={exportToSvg}>
            <img className="itmeIcon" src={download} alt="dowmload" />
        </div>
    </div>
  )
}

export default ToolbarContainer;
