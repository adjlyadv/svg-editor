import React from 'react';
import '../style/ToolbarContainer.scss'
import circle from '../asset/circle.svg'
import pen from '../asset/pen.svg'
import mouse from '../asset/mouse.svg'
import line from '../asset/line.svg'
import rectangle from '../asset/rectangle.svg'




interface Prpos{
    currentTool:string;
    set:(arg0: string)=>void;
}

export default function ToolbarContainer(props:Prpos){

    const handleClick=(e:any)=>{
        props.set(e.target.id)
    }



        return (
                <div className="toolbar">
                    <div className="toolitem" onClick={handleClick} >
                        <img className={props.currentTool==="mouse"?"itmeIconselect":"itmeIcon"} id="mouse"  alt="mouse" src={mouse}/>
                    </div>
                    <div className="toolitem" onClick={handleClick}>
                        <img className={props.currentTool==="circle"?"itmeIconselect":"itmeIcon"} id="circle" alt="circle" src={circle}/>
                    </div>
                    <div className="toolitem" onClick={handleClick}>
                        <img className={props.currentTool==="rectangle"?"itmeIconselect":"itmeIcon"} id="rectangle" alt="rectangle" src={rectangle}/>
                    </div>
                    <div className="toolitem" onClick={handleClick}>
                        <img className={props.currentTool==="line"?"itmeIconselect":"itmeIcon"} id="line" alt="line" src={line}/>
                    </div>
                    <div className="toolitem" onClick={handleClick}>
                        <img className={props.currentTool==="pen"?"itmeIconselect":"itmeIcon"} id="pen" alt="pen" src={pen}/>
                    </div>
                </div>
        )

}
