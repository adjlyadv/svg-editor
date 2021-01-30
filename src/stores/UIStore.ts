import { makeAutoObservable } from 'mobx';

export interface Node {
  posX: number,
  posY: number,
  ctrPosX: number|undefined,
  ctrPosY: number|undefined
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
  pathList: Path[] = [];

  constructor() {
    makeAutoObservable(this);
    this.pathList.push(
      {
        id: 1,
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
          },
        ],
        strokeWidth: 5,
        stroke: "#000000",
        fill: "#ffffff"
      }
    )

  }
  

  setEditorInfo = (width: number, height: number) => {
    
  }
  addPath = () => {
    this.pathList.push(
        {
          id: this.pathList.length+1,
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
          ctrPosX:undefined,
          ctrPosY:undefined,
        }
    )
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