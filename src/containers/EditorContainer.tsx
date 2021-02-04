import React, { useEffect, useRef , useState} from 'react';
import { Node as typeNode, UIStore } from '../stores/UIStore';
import Path from '../elements/path';
import { nodeTypes } from '../elements/constants';
import { getRelativePositon } from '../utils/calculate';
import * as _ from 'lodash';
import '../style/EditorContainer.scss';

interface Props{
  currentTool:string;
  currentPathid:number;
  set:(arg0: number)=>void;
}

const EditorContainer: React.FC<Props> = (props) =>  {

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

  const editing = useRef<boolean>(true)
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
      ctrPosY: node1.ctrPosY,
      ctr2PosX: node1.ctr2PosX,
      ctr2PosY: node1.ctr2PosY
    });
  }

  const handleMouseMove = _.debounce((event: any) => {
    event.stopPropagation();
    if(!UIStore.mouseState.drugging){
      return
    }
    const { x, y } = getRelativePositon(event);

    switch (UIStore.mouseState.type) {
      case (nodeTypes.AnchorPoint): {
        setNode({
          posX: x,
          posY: y,
          ctrPosX: node.ctrPosX,
          ctrPosY: node.ctrPosY,
          ctr2PosX: node.ctr2PosX,
          ctr2PosY: node.ctr2PosY
        });

        break;
      }

      case (nodeTypes.Ctr1Point): {
        setNode({
          posX: node.posX,
          posY: node.posY,
          ctrPosX: x,
          ctrPosY: y,
          ctr2PosX: node.ctr2PosX,
          ctr2PosY: node.ctr2PosY
        });

        break;
      }

      case (nodeTypes.Ctr2Point): {
        setNode({
          posX: node.posX,
          posY: node.posY,
          ctrPosX: node.ctrPosX,
          ctrPosY: node.ctrPosY,
          ctr2PosX: x,
          ctr2PosY: y
        });

        break;
      }
      
    }
  }, 5, { 'trailing': true })
  
  const handleMouseUp = (event: any) => {
    event.stopPropagation();
    UIStore.setMouseState(nodeTypes.AnchorPoint, false, pathid, nodeid);
  }
//创建新的路径 点击
  const pathClick:any = (e:any) => {

    e.stopPropagation();
    clearTimeout(clickTimeChange);
    clickTimeChange = setTimeout(
        () => {
          switch (props.currentTool) {
            case "pen": {
              if (!editing.current) {
                editing.current=true;
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
    editing.current=false;
    setPathId(-1);
  }

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}
           onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
           onDoubleClick={pathDoubleClick} onClick={pathClick}>
        {pathList.map(path => (
          <Path key={path.id} path={path} setPathid={props.set} currentTool={props.currentTool}/>
        ))}
      </svg>
    </div>
  )
}

export default EditorContainer;