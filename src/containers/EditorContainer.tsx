import React, { Fragment,useEffect, useRef , useState} from 'react';
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

  const edtiorRef = useRef<SVGSVGElement>(null);
  const editing = useRef<boolean>(false)
  const [pathId, setPathId] = useState<number>(-1)
  const [editorInfo, setEditorInfo] = useState(UIStore.editorInfo);

  const pathList = UIStore.pathList;
  let pathid = UIStore.mouseState.pathid;
  let nodeid = UIStore.mouseState.nodeid;

 
  const [node, setNode] = useState<typeNode>(pathList[UIStore.mouseState.pathid].nodes[UIStore.mouseState.nodeid]);
  
  useEffect(() => {
    UIStore.setNodes(UIStore.mouseState.pathid, UIStore.mouseState.nodeid, node);
  }, [node])

  const [newNode, setNewnode] = useState<typeNode>(pathList[pathid].nodes[nodeid]);
  const [lastNode, setLastnode] = useState<typeNode>(pathList[pathid].nodes[nodeid]);
  const [startNode, setStartNode] = useState<Boolean>(false);

  let mouseUpTimeChange:any;

  const handleMouseDown = (event: any) => {
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse':{
        pathid = UIStore.mouseState.pathid;
        nodeid = UIStore.mouseState.nodeid
        let node1 = UIStore.pathList[pathid].nodes[nodeid];
        setNode({
          ...node1
        });
      }
      break;
      case 'pen'://钢笔工具 按下的时候确定一个锚点的posx posy
        if(!editing.current){
          editing.current=true;
          setStartNode(true);
          setLastnode({//是路径的第一个锚点时 上一个锚点设置成一样
            posX:x,
            posY:y,
            ctrPosX:x,
            ctrPosY:y,
            ctr2PosX:x,
            ctr2PosY:y
          })
        }
        setNewnode({
          posX:x,
          posY:y,
          ctrPosX:x,
          ctrPosY:y,
          ctr2PosX:x,
          ctr2PosY:y
        })
        break;
    }
  }
    

  const handleMouseMove = _.debounce((event: any) => {
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse':
        if(!UIStore.mouseState.drugging){
          return
        }
        switch (UIStore.mouseState.type) {
          case (nodeTypes.AnchorPoint): {
            setNode({
              ...node,
              posX: x,
              posY: y,
            });
            break;
          }
    
          case (nodeTypes.Ctr1Point): {
            setNode({
              ...node,
              ctrPosX: x,
              ctrPosY: y,
            });
            break;
          }
    
          case (nodeTypes.Ctr2Point): {
            setNode({
              ...node,
              ctr2PosX: x,
              ctr2PosY: y
            });
            break;
          }
      }
    
      break;
      case 'pen'://钢笔工具 如果在编辑模式 移动鼠标的时候不断变化控制点
        if(editing.current){
          setNewnode(
            {
              ...newNode,
              ctrPosX:x,
              ctrPosY:y,
            }
          )
        }
      break;
    }
  }, 5, { 'trailing': true })
 

  const handleMouseUp = (event: any) => {
    event.stopPropagation();
    clearTimeout(mouseUpTimeChange);
    mouseUpTimeChange = setTimeout(
        () => {
          switch(props.currentTool){
            case 'mouse':
              UIStore.setMouseState(nodeTypes.AnchorPoint, false, pathid, nodeid);
            break;
            case 'pen':{//松开鼠标确定一个点 加入path里
              let _pathId = pathId;
              if(pathId === -1){
                _pathId = UIStore.addPath()
                setPathId(_pathId);
              }
              const nodesLength = UIStore.pathList[_pathId].nodes.length;
              const mockCtrX = newNode.posX * 2 - newNode.ctrPosX;
              const mockCtrY = newNode.posY * 2 - newNode.ctrPosY;
              UIStore.addNodes(_pathId,newNode.posX,newNode.posY,newNode.ctrPosX,newNode.ctrPosY,mockCtrX,mockCtrY,nodesLength);
              if(startNode){// 处理第一个节点的渲染
                setLastnode({
                  ...newNode,
                  ctrPosX: mockCtrX,
                  ctrPosY: mockCtrY
                })
                setStartNode(false);
              }else{
                setLastnode({
                  ...newNode
                })
              }
            }
            break;
          } 

        },250)
  }

  const pathDoubleClick:any = () => {
    clearTimeout(mouseUpTimeChange);
    editing.current=false;
    setPathId(-1);
  }

  const addNodes:any = () =>{ 
    if(editing.current){
        const mockCtrX = lastNode.posX * 2 - lastNode.ctrPosX;
        const mockCtrY = lastNode.posY * 2 - lastNode.ctrPosY;
        let getD = `M ${lastNode.posX} ${lastNode.posY} C ${mockCtrX} ${mockCtrY} ${newNode.ctrPosX} ${newNode.ctrPosY}`;
        let width = 0;

        if(lastNode.posX !== newNode.posX && lastNode.posY !== newNode.posY){
          getD += ` ${newNode.posX} ${newNode.posY}`;
          width = 1;
        }else{
          getD += ` ${newNode.ctrPosX} ${newNode.ctrPosY}`;//当没有确定新的锚点时
          width = 0;
        }
        return(
          <Fragment>
            <path d = {getD}  fill="none" stroke="#000" strokeWidth="1"/>
            <circle className="point-control" cx={newNode.posX} cy={newNode.posY} stroke="#55f" r="10" />
            <line x1={newNode.posX} y1={newNode.posY} x2={newNode.ctrPosX} y2={newNode.ctrPosY} stroke="#555" strokeWidth={width} />
            <circle className="point-control" cx={newNode.ctrPosX} cy={newNode.ctrPosY} stroke="#000" r="10" />
          </Fragment>  
        )
    }
  }

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}
           onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
           onDoubleClick={pathDoubleClick}>
        {pathList.map(path => (
          <Path key={path.id} path={path} setPathid={props.set} currentTool={props.currentTool}/>
        ))}
        {addNodes()}
      </svg>
    </div>
  )
}

export default EditorContainer;