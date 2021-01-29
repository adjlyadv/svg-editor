import { makeAutoObservable } from 'mobx';

export interface Node {
  posX: number,
  posY: number,
  ctrPosX: number,
  ctrPosY: number
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
  mouseState ={
    type:false,
    drugging:false,
    pathid: 0,
    nodeid: 0
  }

  pathList: Path[] = [];

  constructor() {
    makeAutoObservable(this);
    this.pathList.push(
      {
        id: 0,
        nodes: [
          {
            posX: 157.5,
            posY: 105.5,
            ctrPosX: 180,
            ctrPosY: 95,
          },
          {
            posX: 227,
            posY: 74,
            ctrPosX: 148.8,
            ctrPosY: 76.5,
          }
        ],
        strokeWidth: 5,
        stroke: "#000000",
        fill: "none"
      }
    )

    this.pathList.push(
      {
        id: 1,
        nodes: [
          {
            posX: 257.5,
            posY: 205.5,
            ctrPosX: 280,
            ctrPosY: 195,
          },
          {
            posX: 327,
            posY: 174,
            ctrPosX: 248.8,
            ctrPosY: 176.5,
          }
        ],
        strokeWidth: 5,
        stroke: "#000000",
        fill: "none"
      }
    )

  }
  setEditorInfo = (width: number, height: number) => {
    
  }

  setNodes = (pathId: number, nodeId: number, node: Node) => {
    this.pathList[pathId].nodes[nodeId] = node;
  }

  setMouseState = (type:boolean,dragging:boolean,pathid:number,nodeid:number) => {
    this.mouseState.pathid = pathid;
      this.mouseState.nodeid = nodeid;
      this.mouseState.type = type;//为真是锚点，为假是控制点
      this.mouseState.drugging = dragging;
  }
  setStateInfo = (pathId: number, name:string, value:string) => {
    switch(name){
      case 'X':
        let node1 = this.pathList[0].nodes[0];
        node1.posX = Number(value);
        this.setNodes(0, 0,node1);
        break;
      case 'Y':
        let node2 = this.pathList[0].nodes[0];
        node2.posY = Number(value)
        this.setNodes(0, 0,node2);
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
  }
}

export const UIStore = new UIstore();