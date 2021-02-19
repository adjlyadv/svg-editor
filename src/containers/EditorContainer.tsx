import React, { Fragment,useEffect, useRef , useState} from 'react';
import {myIndexDB} from '../stores/myIndexDb';
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
    const initPathList = async() =>{
      await myIndexDB.openDB().then(()=>{return myIndexDB.readAll()}).then(
        ()=>{
          setNode({
            posX: -1,
            posY: -1,
            ctrPosX: -1,
            ctrPosY: -1,
          });
          console.log('更新成功');
        }
      )
    }
    initPathList();
    
  }, [])

  const edtiorRef = useRef<SVGSVGElement>(null);
  const editing = useRef<boolean>(false)
  const [pathId, setPathId] = useState<number>(-1)
  const [editorInfo, setEditorInfo] = useState(UIStore.editorInfo);
  const [startNode, setStartNode] = useState<Boolean>(false);
  const pathList = UIStore.pathList;
  let pathid = UIStore.mouseState.pathid;//鼠标点击的路径
  let nodeid = UIStore.mouseState.nodeid;//鼠标点击的点

 
  const [node, setNode] = useState<typeNode>({
    posX: -1,
    posY: -1,
    ctrPosX: -1,
    ctrPosY: -1,
  });
  
  useEffect(() => {
    UIStore.setNodes(UIStore.mouseState.pathid, UIStore.mouseState.nodeid, node);
  }, [node])

  useEffect(() => {
    if (props.currentTool !== "pen"){
      const _pathid=pathId;
      if (_pathid !== -1 && UIStore.pathList[_pathid].nodes.length < 2){
        UIStore.deletePath(_pathid);
        editing.current=false;
        setPathId(-1);
      }
      else if (_pathid !== -1 && UIStore.pathList[_pathid].nodes.length >= 2){
        editing.current=false;
        setPathId(-1);
      }
    }
  }, [props.currentTool,pathId])

  const [newNode, setNewnode] = useState<typeNode>({
    posX: -1,
    posY: -1,
    ctrPosX: -1,
    ctrPosY: -1,
  });//增加时的新点（只是点击了，但是还没有松开 ）
  const [lastNode, setLastnode] = useState<typeNode>({
    posX: -1,
    posY: -1,
    ctrPosX: -1,
    ctrPosY: -1,
  });//上一个点（已经增加到路径里面）

  const [pos, setPos] = useState({posX : -1 ,posY : -1});
  const [dragPath, setDragPath] = useState<boolean>(false);
  let mouseUpTimeChange:any;

  const handleMouseDown = (event: any) => {//鼠标按下
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse_drag_node':{
        pathid = UIStore.mouseState.pathid;
        nodeid = UIStore.mouseState.nodeid;
        if(pathid!==-1 && nodeid!== -1){
          let node1 = UIStore.pathList[pathid].nodes[nodeid];
          setNode({
            ...node1
          });
        }
      }
      break;
      case 'mouse_drag_path':
        setDragPath(true);
        setPos({
          posX: x,
          posY: y
        })
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
    

  const handleMouseMove = _.throttle((event: any) => {//鼠标移动
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse_drag_node':
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
      case 'mouse_drag_path':
        if(!dragPath){
          return;
        }
        const moveX=x-pos.posX;
        const moveY=y-pos.posY;
          UIStore.movePath(props.currentPathid , moveX , moveY)
          setPos({
            posX: x,
            posY: y
          })


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
 

  const handleMouseUp = (event: any) => {//鼠标松开
    event.stopPropagation();
    clearTimeout(mouseUpTimeChange);
    mouseUpTimeChange = setTimeout(
        () => {
          switch(props.currentTool){
            case 'mouse_drag_node':
              UIStore.setMouseState(nodeTypes.AnchorPoint, false, pathid, nodeid);
            break;
            case 'mouse_drag_path':
              setDragPath(false);

              break;
            case 'pen':{//松开鼠标确定一个点 加入path里
              if (!editing.current){
                return;
              }
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

  const pathDoubleClick:any = () => {//双击鼠标
    clearTimeout(mouseUpTimeChange);
    editing.current=false;
    setPathId(-1);
  }

  const addNodes:any = () =>{ //增加锚点的时候
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