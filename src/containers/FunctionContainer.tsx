import React  from 'react';
import '../style/FunctionContainer.scss'


interface Props{
  currentTool:string;
  set:(arg0: string)=>void;
  id:string;

}

const ToolbarContainer:  React.FC<Props> = (props) => {

  function handleClick(e:any){
    props.set(e.target.id)
  }

  return (


      <div  className="function">
        {( ()=>{
            switch(props.id){
              case "mouse":return [
                <div className={props.currentTool==="mouse_rotate_path"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="mouse_rotate_path">Rotate Path</div>,
                <div className={props.currentTool==="mouse_scaling_path"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="mouse_scaling_path">Scaling Path</div>,
                <div className={props.currentTool==="mouse_drag_path"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="mouse_drag_path">Drag Path</div>
              ]
              case "pen":return [
                <div className={props.currentTool==="pen_add_node"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="pen_add_node">Add Node</div>,
                <div className={props.currentTool==="pen_drag_node"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="pen_drag_node">Drag Node</div>,
                <div className={props.currentTool==="pen_new_path"?"functionItemSelect":"functionItem"}
                     onClick={handleClick} id="pen_new_path">New Path</div>
              ]

              default:return null;
            }
          }
        )()}
      </div>



  )
}

export default ToolbarContainer;
