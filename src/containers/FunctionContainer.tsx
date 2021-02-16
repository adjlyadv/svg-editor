import React from 'react';
import '../style/FunctionContainer.scss'


interface Props{
    currentTool:string;
    set:(arg0: string)=>void;
}

const ToolbarContainer:  React.FC<Props> = (props) => {

    function handleClick(e:any){
        console.log(e.target.id)
        props.set(e.target.id)
    }

    return (
        <div className="function">
            <div className={props.currentTool==="mouse_add_node"?"functionItemSelect":"functionItem"}
                 onClick={handleClick} id="mouse_add_node">Add Node</div>
            <div className={props.currentTool==="mouse_drag_node"?"functionItemSelect":"functionItem"}
                 onClick={handleClick} id="mouse_drag_node">Drag Node</div>
            <div className={props.currentTool==="mouse_drag_path"?"functionItemSelect":"functionItem"}
                 onClick={handleClick} id="mouse_drag_path">Drag Path</div>
        </div>
    )
}

export default ToolbarContainer;
