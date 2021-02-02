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
    type: false,
    drugging: false,
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
            posX: 125.5,
            posY: 171.5,
            ctrPosX: 194.5,
            ctrPosY: 85.5
          },
          {
            posX: 246.5,
            posY: 140.5,
            ctrPosX: 288.5,
            ctrPosY: 95.5,
          },
          {
            posX: 210,
            posY: 261,
            ctrPosX: 309.5,
            ctrPosY: 309.5,
          },
        ],
        strokeWidth: 5,
        stroke: "#000000",
        fill: "none"
      }
    )
    // M125.5,171.5C194.5,85.5 288.5,95.5 246.5,140.5C204.5,185.5 309.5,309.5 210,261
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
    return this.pathList.length;
  }
  setNodes = (pathId: number, nodeId: number, node: Node) => {
    this.pathList[pathId].nodes[nodeId] = node;
  }

  addNodes =(pathId: number , posX: number, posY: number) => {
    this.pathList[pathId-1].nodes.push(
        {
          posX: posX,
          posY: posY,
          ctrPosX:posX,
          ctrPosY:posY,
        }
    )

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