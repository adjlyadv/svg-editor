import React, {useEffect, useRef} from 'react';
import {UIStore} from '../stores/UIStore';
import Path from '../elements/path';
import '../style/EditorContainer.scss';
interface Props{
  currentTool:string
}

const EditorContainer: React.FC<Props> = ({currentTool}) =>  {

  useEffect(() => {
    if (!edtiorRef) {
      return
    }

    const editorInfo = edtiorRef?.current?.getBoundingClientRect();

    if (editorInfo) {
      UIStore.editorInfo.top = editorInfo.top;
      UIStore.editorInfo.left = editorInfo.left;
    }
  }, [])

  const edtiorRef = useRef<SVGSVGElement>(null);
  var clickTimeChange:any;
  const pathId=useRef(-1)
  const editorInfo = UIStore.editorInfo;
  const pathList = UIStore.pathList;

  const pathClick:any=(e:any)=>{
    clearTimeout(clickTimeChange);
    clickTimeChange = setTimeout(
        () => {
          if(currentTool=="pen"&&pathId.current==-1){
            pathId.current=UIStore.addPath();
          }
          console.log(pathId.current)
          console.log(UIStore.pathList)
          UIStore.addNodes(pathId.current,e.pageX-150,e.pageY-128)
        },
        1000
    );

  }
  const pathDoubleClick:any=()=>{
    clearTimeout(clickTimeChange);
    console.log("双击")
    pathId.current=-1
  }

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" onDoubleClick={pathDoubleClick} onClick={pathClick}
           width={editorInfo.width} height={editorInfo.height}>
        {pathList.map(path => (
          <Path path={path}/>
        ))}
      </svg>
    </div>
  )

}

export default EditorContainer;