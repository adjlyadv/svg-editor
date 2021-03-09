import { makeAutoObservable} from 'mobx';
import { nodeTypes } from '../elements/constants';
import { myIndexDB } from './myIndexDb';
export interface Node{
  posX: number,
  posY: number,
  ctrPosX: number,
  ctrPosY: number,
  ctr2PosX?: number,
  ctr2PosY?: number,
}
export interface Point{
  ctrx:number,
  ctry:number
}
export interface Path {
  id: number,
  nodes: Node[],
  type: number, // 0 非闭合 1 闭合
  strokeWidth: number,
  stroke: string,
  fill:string,
  centerPoint:Point,//路径中心
  rotate:number;//旋转的角度
  border: Point[]//边界  point[0]代表左上角  point[1]右上角  point[2]右下角  point[3] 左下角
}

class UIstore {

  editorInfo = {
    width: 800,
    height: 600,
    left: 0,
    top: 0
  }
  mouseState = {
    type: nodeTypes.AnchorPoint,
    drugging: false,
    pathid: -1,
    nodeid: -1,
  }

  currentTool = "mouse";

  pathList: Path[] = [];
  editingPathId = -1;
  
  constructor() {
    makeAutoObservable(this); 
  }

  //设置路径边界和中心
  setPathBbox = (path:SVGPathElement,pathid:number) => {
    let svgBox = path.getBBox();
    let ctrx = svgBox.x + (svgBox.width >> 1);
    let ctry = svgBox.y + (svgBox.height >> 1);
    this.pathList[pathid].centerPoint = {ctrx,ctry};
    this.pathList[pathid].border = [
      {ctrx:svgBox.x, ctry:svgBox.y},
      {ctrx: svgBox.x + svgBox.width, ctry:svgBox.y},
      {ctrx: svgBox.x + svgBox.width, ctry:svgBox.y + svgBox.height},
      {ctrx: svgBox.x, ctry:svgBox.y + svgBox.height}
    ];
    myIndexDB.update(this.pathList[pathid]);
  }

  initPathList = (id:number,path:Path) =>{
    this.pathList[id] = path;
  }

  addPath = (type?:number) => {
    this.pathList.push(
        {
          id: this.pathList.length,
          nodes: [],
          strokeWidth: 5,
          stroke: "#000000",
          fill: "none",
          type: type || 0,
          centerPoint:{ctrx:-1,ctry:-1},
          rotate:0,
          border:[{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1}]
        }
    )
    return this.pathList.length - 1;
  }

  deletePath = (pathId: number) => {
    this.pathList = this.pathList.splice(pathId,1);
    myIndexDB.remove(pathId);
  }

  setEditingPath = (pathId: number) => {
    this.editingPathId = pathId;
  }

  setNodes = (pathId: number, nodeId: number, node: Node) => {
    if(this.pathList[pathId]){
      this.pathList[pathId].nodes[nodeId] = node;
      myIndexDB.update(this.pathList[pathId]);
    }
  }

  addNodes =(pathId: number , posX: number, posY: number, ctrPosX?: number, ctrPosY?: number, ctr2PosX?: number, ctr2PoxY?: number, index?: number,over?:boolean) => {

    const nodesLength = this.pathList[pathId].nodes.length;
    const type = this.pathList[pathId].type;
    if(nodesLength === 0 || over){
      if(type){//闭合路径的第一个有两个控制点
        this.pathList[pathId].nodes.push(
          {
            posX: posX,
            posY: posY,
            ctrPosX: ctrPosX || posX,
            ctrPosY: ctrPosY || posY,
            ctr2PosX: ctr2PosX,
            ctr2PosY: ctr2PoxY
          }
        )
      }
      else{//非闭合路径的第一个和最后一个只有一个控制点
        this.pathList[pathId].nodes.push(
          {
            posX: posX,
            posY: posY,
            ctrPosX: ctrPosX || posX,
            ctrPosY: ctrPosY || posY
          }
        )
      }
      if(nodesLength === 0){
        myIndexDB.add(this.pathList[pathId]);
      }else{
        myIndexDB.update(this.pathList[pathId]);
      }
    }
    else{
      this.pathList[pathId].nodes = [
        ...this.pathList[pathId].nodes.slice(0, index || nodesLength),
        {
          posX: posX,
          posY: posY,
          ctrPosX: ctrPosX || posX,
          ctrPosY: ctrPosY || posY,
          ctr2PosX: ctr2PosX,
          ctr2PosY: ctr2PoxY
        },
        ...this.pathList[pathId].nodes.slice(index || nodesLength)
      ]
      myIndexDB.update(this.pathList[pathId]);
    }

  }

  setMouseState = (type: number, dragging:boolean, pathid:number, nodeid:number) => {
    this.mouseState.pathid = pathid;
    this.mouseState.nodeid = nodeid;
    this.mouseState.type = type;
    this.mouseState.drugging = dragging;
  }

  setCurrentTool = (toolName: string) => {
    this.currentTool = toolName;
  } 

  movePath = (pathid: number , moveX: number , moveY: number) => {
    for( let it of this.pathList[pathid].nodes){
      it.posX += moveX;
      it.posY += moveY;
      it.ctrPosX += moveX;
      it.ctrPosY += moveY;
      if(it.ctr2PosY && it.ctr2PosX){
        it.ctr2PosX += moveX;
        it.ctr2PosY += moveY;
      }
    }
    myIndexDB.update(this.pathList[pathid]);
  }

  setBorder = (pathid: number, border: Point [])=>{
    this.pathList[pathid].border = border;
  }

  setStateInfo = (pathId: number, name:string, value:string) => {
    switch(name){
      case 'X':
        let oldX = this.pathList[pathId].nodes[0].posX;
        this.movePath(pathId, Number(value) - oldX, 0);
        break;
      case 'Y':
        let oldY = this.pathList[pathId].nodes[0].posY;
        this.movePath(pathId,0, Number(value) - oldY);
        break;
      case 'fill':
        this.pathList[pathId].fill = value;
        break;
      case 'strokeWidth':
        this.pathList[pathId].strokeWidth = Number(value);
        break;
      case 'stroke':
        this.pathList[pathId].stroke = value;
        break;
      case 'rotate':
        this.pathList[pathId].rotate = Number(value);
        break;
      default:        
    }
    myIndexDB.update(this.pathList[pathId]);
  }
}

export const UIStore = new UIstore();