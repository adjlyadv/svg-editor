import { makeAutoObservable, toJS} from 'mobx';
import { nodeTypes } from '../elements/constants';
import { myIndexDB } from './myIndexDb';


export interface Node {
  posX: number,
  posY: number,
  ctrPosX: number,
  ctrPosY: number,
  ctr2PosX?: number,
  ctr2PosY?: number,
}

export interface Path {
  id: number,
  nodes: Node[],
  strokeWidth: number,
  stroke: string,
  fill:string
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
    nodeid: -1
  }

  pathList: Path[] = [];
  
  constructor() {
    makeAutoObservable(this); 
  }

  initPathList = (id:number,path:Path) =>{
    this.pathList[id] = path;
  }

  addPath = () => {
    this.pathList.push(
        {
          id: this.pathList.length,
          nodes: [],
          strokeWidth: 5,
          stroke: "#000000",
          fill: "#ffffff"
        }
    )
    return this.pathList.length - 1;
  }

  deletePath = (pathId: number) => {
    this.pathList = this.pathList.splice(pathId,1);
    myIndexDB.remove(pathId);
  }

  setNodes = (pathId: number, nodeId: number, node: Node) => {
    if(this.pathList[pathId]){
      this.pathList[pathId].nodes[nodeId] = node;
      let path = toJS(this.pathList[pathId]);
      myIndexDB.update(path);
    }
    
  }

  addNodes =(pathId: number , posX: number, posY: number, ctrPosX?: number, ctrPosY?: number, ctr2PosX?: number, ctr2PoxY?: number, index?: number) => {

    const nodesLength = this.pathList[pathId].nodes.length;
    if(nodesLength === 0){
      this.pathList[pathId].nodes.push(
        {
          posX: posX,
          posY: posY,
          ctrPosX: ctrPosX || posX,
          ctrPosY: ctrPosY || posY
        }
      )
      let path = toJS(this.pathList[pathId]);
      myIndexDB.add(path);

    }
    else{
      this.pathList[pathId].nodes = [
        ...this.pathList[pathId].nodes.slice(0, index || nodesLength - 1),
        {
          posX: posX,
          posY: posY,
          ctrPosX: ctrPosX || posX,
          ctrPosY: ctrPosY || posY,
          ctr2PosX: ctr2PosX,
          ctr2PosY: ctr2PoxY
        },
        ...this.pathList[pathId].nodes.slice(index || nodesLength - 1)
      ]
      let path = toJS(this.pathList[pathId]);
      myIndexDB.update(path);
    }

  }

  setMouseState = (type: number, dragging:boolean, pathid:number, nodeid:number) => {
    this.mouseState.pathid = pathid;
    this.mouseState.nodeid = nodeid;
    this.mouseState.type = type;
    this.mouseState.drugging = dragging;
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
    let path = toJS(this.pathList[pathid]);
    myIndexDB.update(path);
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
      default:        
    }
    let path = toJS(this.pathList[pathId]);
    myIndexDB.update(path);
  }
}

export const UIStore = new UIstore();