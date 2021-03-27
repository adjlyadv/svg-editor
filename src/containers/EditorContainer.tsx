import React, { Fragment,useEffect, useRef , useState} from 'react';
import {myIndexDB} from '../stores/myIndexDb';
import { Node as typeNode, UIStore } from '../stores/UIStore';
import Path from '../elements/path';
import { nodeTypes } from '../elements/constants';
import { getRelativePositon, getCentralSymmetryPosition ,getAngle,getCircleNodes,getRectNodes,calRotatePath} from '../utils/calculate';
import * as _ from 'lodash';
import '../style/EditorContainer.scss';
import useKeyboardShortcut from '../utils/useKeyboardShortcut';

interface Props{
  currentTool:string;
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
      try{
        await myIndexDB.openDB();
        await myIndexDB.readAll();
        setNode({ posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1});//加载结束后重新渲染页面
        console.log('加载数据结束');
      }catch(err){
        console.log('加载失败');
      }
    }
    initPathList();
  }, [])

  const edtiorRef = useRef<SVGSVGElement>(null);
  const editing = useRef<boolean>(false)
  const [pathId, setPathId] = useState<number>(-1)
  const [editorInfo, setEditorInfo] = useState(UIStore.editorInfo);
  const [startNode, setStartNode] = useState<Boolean>(false);
  const pathList = UIStore.pathList;
  let pathid = UIStore.mouseState.pathid;
  let nodeid = UIStore.mouseState.nodeid;

 
  const [node, setNode] = useState<typeNode>({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });
  
  useEffect(() => {
    UIStore.setNodes(UIStore.mouseState.pathid, UIStore.mouseState.nodeid, node);
  }, [node])

  useEffect(() => {
    if (props.currentTool !== "pen_new_path"){
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

  const [toolNode, setToolNode] = useState<boolean>(false);
  const [newToolNode, setNewToolNode] = useState<typeNode>({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 }); 
  
  const [newNode, setNewnode] = useState<typeNode>({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });
  const [lastNode, setLastnode] = useState<typeNode>({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });

  const [pos, setPos] = useState({posX : -1 ,posY : -1});
  const [dragPath, setDragPath] = useState<boolean>(false);
  let mouseUpTimeChange:any;

  const handleMouseDown = (event: any) => {
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse_drag_path':{
        const currentPathid = UIStore.editingPathId;
        if(currentPathid !== -1){
          setDragPath(true);
          setPos({
            posX: x,
            posY: y
          })
        }
      break;
      }

      case 'mouse_rotate_path':{
        const currentPathid = UIStore.editingPathId;
        if(currentPathid !== -1){
          setToolNode(true);
          setNewToolNode({
            posX:x,
            posY:y,
            ctrPosX:x,
            ctrPosY:y
          })
        }
      break;
      }
      case 'rectangle':
      case 'circle':
        setToolNode(true);
        setNewToolNode({
          posX:x,
          posY:y,
          ctrPosX:x,
          ctrPosY:y
        })
      break;
      case 'pen_drag_node':
        pathid = UIStore.mouseState.pathid;
        nodeid = UIStore.mouseState.nodeid;
        if(pathid!==-1 && nodeid!== -1){
          let node1 = UIStore.pathList[pathid].nodes[nodeid];
          setNode({
            ...node1
          });
       }
      break;
      case 'pen_new_path'://钢笔工具 按下的时候确定一个锚点的posx posy
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
    

  const handleMouseMove = _.throttle((event: any) => {
    event.stopPropagation();
    const { x, y } = getRelativePositon(event);
    switch(props.currentTool){
      case 'mouse_drag_path':
        if(!dragPath){
          return;
        }
        const moveX=x-pos.posX;
        const moveY=y-pos.posY;
        const currentPathid = UIStore.editingPathId;
        UIStore.setDragPath(currentPathid , moveX , moveY)

      break;
      case 'mouse_scaling_path':{
        const currentPathid = UIStore.editingPathId;
        if(currentPathid !== -1 && UIStore.pathList[currentPathid].scalling !== ''){
          if(document.body.style.cursor === ""){
            switch (UIStore.pathList[currentPathid].scalling){
              case 'right':
              case 'left':
                document.body.style.cursor = 'e-resize';
                break;
              case 'top':
              case 'bottom':
                document.body.style.cursor = 's-resize';
                break;
              case 'left_bottom':
              case 'right_top':
                document.body.style.cursor = 'ne-resize';
                break;
              case 'left_top':
              case 'right_bottom':
                document.body.style.cursor = 'se-resize';
                break;
            }
          }
          if(UIStore.pathList[currentPathid].scalling.indexOf("left") !== -1  || UIStore.pathList[currentPathid].scalling.indexOf("right") !== -1){
            UIStore.setScaleX(currentPathid,x);
          }
          if(UIStore.pathList[currentPathid].scalling.indexOf("top") !== -1  || UIStore.pathList[currentPathid].scalling.indexOf("bottom") !== -1){
            UIStore.setScaleY(currentPathid,y);
          }
        }
        break;
      }
      case 'mouse_rotate_path':{
        if(toolNode){
          const currentPathid = UIStore.editingPathId;
          const {ctrx,ctry} = UIStore.pathList[currentPathid].centerPoint;
          setNewToolNode({
            ...newToolNode,
            ctrPosX:x,
            ctrPosY:y
          })
          let angle = getAngle({
            posX:newToolNode.posX - ctrx,
            posY:newToolNode.posY - ctry,
            ctrPosX:newToolNode.ctrPosX - ctrx,
            ctrPosY:newToolNode.ctrPosY - ctry
          });
          UIStore.setStateInfo(currentPathid,'rotate',angle.toString());
        }
      break;
      }
      case 'rectangle':
      case 'circle':
        if(toolNode){
          setNewToolNode({
            ...newToolNode,
            ctrPosX:x,
            ctrPosY:y
          })
        }
      break;
      case 'pen_drag_node':
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
      case 'pen_new_path'://钢笔工具 如果在编辑模式 移动鼠标的时候不断变化控制点
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
    const { x, y } = getRelativePositon(event);
    clearTimeout(mouseUpTimeChange);
    mouseUpTimeChange = setTimeout(
        () => {
          switch(props.currentTool){
            case 'mouse_drag_path':
              if(!dragPath){
                return;
              }
              setDragPath(false);
              const currentPathid = UIStore.editingPathId;
              UIStore.movePath(currentPathid,x-pos.posX,y-pos.posY)
              break;
            case 'mouse_scaling_path':{
              document.body.style.cursor = "";

              const currentPathid = UIStore.editingPathId;
              if(UIStore.pathList[currentPathid]?.scalling !== ""){
                UIStore.scaleFinshX(currentPathid,x);
                UIStore.scaleFinshY(currentPathid,y);
                UIStore.setScalling(currentPathid,"");
              }

              break;
            }
            case 'mouse_rotate_path':
              if(toolNode){
                const currentPathid = UIStore.editingPathId;
                calRotatePath(currentPathid);
                UIStore.setStateInfo(currentPathid,'rotate','0');//把rotate置零
              }
              setToolNode(false);
              setNewToolNode({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });
              break;
            case 'rectangle':
                if(toolNode){
                  let _pathId = pathId;
                  if(pathId === -1){
                    _pathId = UIStore.addPath(1);
                    let nodes = getRectNodes(newToolNode);
                    nodes.forEach((node)=>{
                      UIStore.addNodes(_pathId,node.posX,node.posY,node.ctrPosX,node.ctrPosY,node.ctr2PosX,node.ctr2PosY);
                    })
                  }
                }
                setToolNode(false);
                setNewToolNode({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });
              break;
            case 'circle':
                if(toolNode){
                  let _pathId = pathId;
                  if(pathId === -1){
                    _pathId = UIStore.addPath(1);
                    let nodes = getCircleNodes(newToolNode);
                    nodes.forEach((node)=>{
                      UIStore.addNodes(_pathId,node.posX,node.posY,node.ctrPosX,node.ctrPosY,node.ctr2PosX,node.ctr2PosY);
                    })
                  }
                }
                setToolNode(false);
                setNewToolNode({posX: -1, posY: -1, ctrPosX: -1, ctrPosY: -1 });
              break;
            case 'pen_drag_node':
                UIStore.setMouseState(nodeTypes.AnchorPoint, false, pathid, nodeid);
              break; 
            case 'pen_new_path':{//松开鼠标确定一个点 加入path里
              if (!editing.current){
                return;
              }
              let _pathId = pathId;
              if(pathId === -1){
                _pathId = UIStore.addPath()
                setPathId(_pathId);
              }

              UIStore.setEditingPath(_pathId);

              if (UIStore.pathList[_pathId].type) {
                // 需要创建闭合路径了，退出编辑模式
                const _node = UIStore.pathList[_pathId].nodes[0];
                const { ctr2PosX, ctr2PosY } = getCentralSymmetryPosition(_node);
                UIStore.pathList[_pathId].nodes[0].ctr2PosX = ctr2PosX;
                UIStore.pathList[_pathId].nodes[0].ctr2PosY = ctr2PosY;
                editing.current = false;
                setPathId(-1);
                return
              }

              const nodesLength = UIStore.pathList[_pathId].nodes.length;
              const { ctr2PosX, ctr2PosY } = getCentralSymmetryPosition(newNode);
              UIStore.addNodes(_pathId,newNode.posX,newNode.posY,newNode.ctrPosX,newNode.ctrPosY,ctr2PosX,ctr2PosY,nodesLength);
              if(startNode){// 处理第一个节点的渲染
                setLastnode({
                  ...newNode,
                  ctrPosX: ctr2PosX,
                  ctrPosY: ctr2PosY
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
    switch(props.currentTool){
      case 'pen_new_path':
        if (!editing.current || pathId === -1){
          return;
        }
        let _pathId = pathId;
        const nodesLength = UIStore.pathList[_pathId].nodes.length;
        UIStore.addNodes(_pathId,newNode.posX,newNode.posY,newNode.ctrPosX,newNode.ctrPosY,newNode.ctrPosX,newNode.ctrPosY,nodesLength,true);
    }
    editing.current=false;
    setPathId(-1);
  }

  const addNodes:any = () =>{
    if(editing.current){
      const { ctr2PosX, ctr2PosY } = getCentralSymmetryPosition(lastNode);
        let getD = `M ${lastNode.posX} ${lastNode.posY} C ${ctr2PosX} ${ctr2PosY} ${newNode.ctrPosX} ${newNode.ctrPosY}`;
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
          </Fragment>  
        )
    }
  }
  const addOtherPath:any = () =>{
    if(toolNode){

      let nodes = new Array(4).fill({
        posX:-1,
        posY:-1,
        ctrPosX:-1,
        ctrPosY:-1,
        ctr2PosX:-1,
        ctr2PosY:-1
      })
      switch(props.currentTool){
        case 'rectangle': nodes = getRectNodes(newToolNode);break;
        case 'circle':nodes = getCircleNodes(newToolNode);break;
      }
      let getD = 
      `M ${nodes[0].posX} ${nodes[0].posY} 
      C ${nodes[0].ctrPosX} ${nodes[0].ctrPosY} ${nodes[1].ctrPosX} ${nodes[1].ctrPosY} ${nodes[1].posX} ${nodes[1].posY} 
      C ${nodes[1].ctr2PosX} ${nodes[1].ctr2PosY} ${nodes[2].ctrPosX} ${nodes[2].ctrPosY} ${nodes[2].posX} ${nodes[2].posY} 
      C ${nodes[2].ctr2PosX} ${nodes[2].ctr2PosY} ${nodes[3].ctrPosX} ${nodes[3].ctrPosY} ${nodes[3].posX} ${nodes[3].posY} 
      C ${nodes[3].ctr2PosX} ${nodes[3].ctr2PosY} ${nodes[0].ctr2PosX} ${nodes[0].ctr2PosY} ${nodes[0].posX} ${nodes[0].posY} Z`;
        return(
          <Fragment>
            <path d = {getD}  fill="none" stroke="#55f" strokeWidth="1"/>
          </Fragment>  
        )
    }
  }

  useKeyboardShortcut("backspace", () => UIStore.deletePath(UIStore.editingPathId));

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}
           onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
          onDoubleClick={pathDoubleClick}>
        {addNodes()}
        {pathList.map((path, index) => (
          <Path pathId={index} path={path} currentTool={props.currentTool}/>
        ))}
        {addOtherPath()}

      </svg>
    </div>
  )
}

export default EditorContainer;