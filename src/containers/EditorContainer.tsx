import React, { useEffect, useRef , useState} from 'react';
import { Node as typeNode, UIStore } from '../stores/UIStore';
import Path from '../elements/path';
import { getRelativePositon } from '../utils/calculate';
import * as _ from 'lodash';
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
      setEditorInfo(editorInfo);
    }

  }, [])

  //cucurrentTool改变
  useEffect(() => {
    if (currentTool !== "pen") {
      setStartNode({posX: -1, posY: -1});
      console.log("qing")
      setPathId(-1);

    }
  },[currentTool])

  const edtiorRef = useRef<SVGSVGElement>(null);
  var clickTimeChange:any;

  const [editing, setEditing] = useState<boolean>(true)
  const [pathId, setPathId] = useState<number>(-1)
  const [editorInfo, setEditorInfo] = useState(UIStore.editorInfo);

  const [startNode,setStartNode] = useState(
      {
        posX : -1,
        posY :-1
      }
  )

  const pathList = UIStore.pathList;
  let pathid = UIStore.mouseState.pathid;
  let nodeid = UIStore.mouseState.nodeid;


  const [node, setNode] = useState<typeNode>(pathList[UIStore.mouseState.pathid].nodes[UIStore.mouseState.nodeid]);
  
  
  useEffect(() => {
    UIStore.setNodes(UIStore.mouseState.pathid, UIStore.mouseState.nodeid, node);
  }, [node])

  const handleMouseDown = (event: any) => {
    event.stopPropagation();
    pathid = UIStore.mouseState.pathid;
    nodeid = UIStore.mouseState.nodeid;
    let node1 = UIStore.pathList[pathid].nodes[nodeid];
    setNode({
      posX: node1.posX,
      posY: node1.posY,
      ctrPosX: node1.ctrPosX,
      ctrPosY: node1.ctrPosY
    });
  }

  const handleMouseMove = _.debounce((event: any) => {
    event.stopPropagation();
    if(!UIStore.mouseState.drugging){
      return
    }
    const { x, y } = getRelativePositon(event);
    //锚点
    if(UIStore.mouseState.type){
    setNode({
      posX: x,
      posY: y,
      ctrPosX: node.ctrPosX,
      ctrPosY: node.ctrPosY
    });
  }
  //控制点
  else{
    setNode({
      posX: node.posX,
      posY: node.posY,
      ctrPosX: x,
      ctrPosY: y
    })
  }

  }, 5, { 'trailing': true })
  
  const handleMouseUp = (event: any) => {
    event.stopPropagation();
    UIStore.setMouseState(false,false,pathid,nodeid);
  }

  const pathClick:any = (e:any) => {

    e.stopPropagation();
    clearTimeout(clickTimeChange);
    clickTimeChange = setTimeout(
        () => {
          switch (currentTool) {
            case "pen": {
              if (!editing) {
                setEditing(true);
              } else {
                let _pathId = pathId;
                if (_pathId === -1) {
                  if (startNode.posX > -1 && startNode.posY > -1) {
                    _pathId = UIStore.addPath()
                    setPathId(_pathId);
                    UIStore.addNodes(_pathId, startNode.posX, startNode.posY);
                    setStartNode({posX : -1, posY: -1});
                  } else {
                    setStartNode({posX : e.pageX - editorInfo.left, posY: e.pageY - editorInfo.top});
                    return;
                  }

                }
                UIStore.addNodes(_pathId, e.pageX - editorInfo.left, e.pageY - editorInfo.top)
              }
            }
          }
        },
        300
    );
  }

  
  const pathDoubleClick:any = () => {
    clearTimeout(clickTimeChange);
    setEditing(false);
    setPathId(-1);
  }

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}
           onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
           onDoubleClick={pathDoubleClick} onClick={pathClick}>
        {pathList.map(path => (
          <Path key={path.id} path={path}/>
        ))}
      </svg>
    </div>
  )
}

export default EditorContainer;