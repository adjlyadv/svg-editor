import { makeAutoObservable} from 'mobx';
import { nodeTypes } from '../elements/constants';
import { myIndexDB } from './myIndexDb';
import {genID, scallingPos} from '../utils/calculate';
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
  id: string,
  nodes: Node[],
  type: number, // 0 非闭合 1 闭合
  strokeWidth: number,
  stroke: string,
  fill:string,
  centerPoint:Point,//路径中心
  rotate:number;//旋转的角度
  border: Point[],//边界  point[0]代表左上角  point[1]右上角  point[2]右下角  point[3] 左下角
  scalling:string,
  scaleX: number,
  scaleY: number,
  scale_origin: string,
  translate:{
    left: number,
    right: number,
    top: number,
    bottom: number
  },
  dragPath: {
    x: number,
    y: number
  }
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
    // this.pathList[id] = path; 
    this.pathList.push(path);
  }

  addPath = (type?:number) => {
    this.pathList.push(
        {
          id: genID(),
          nodes: [],
          strokeWidth: 5,
          stroke: "#000000",
          fill: "none",
          type: type || 0,
          centerPoint:{ctrx:-1,ctry:-1},
          rotate:0,
          border:[{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1},{ctrx:-1,ctry:-1}],
          scalling:"",
          scaleX: 1,
          scaleY: 1,
          scale_origin: '',
          translate:{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          dragPath: {
            x: 0,
            y: 0
          }
        }
    )
    return this.pathList.length - 1;
  }

  deletePath = (pathId: number) => {
    const id = this.pathList[pathId].id;
    this.pathList.splice(pathId,1);
    // for (let i = 0; i < this.pathList.length; i ++) {
    //   this.pathList[i].id = i;
    // }
    this.editingPathId = -1;
    myIndexDB.remove(id);
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
    for( let it of this.pathList[pathid].border){
      it.ctrx += moveX;
      it.ctry += moveY;
    }
    this.pathList[pathid].centerPoint.ctrx += moveX;
    this.pathList[pathid].centerPoint.ctry += moveY;

    this.setDragPath(pathid,0,0);
    myIndexDB.update(this.pathList[pathid]);
  }

  setBorder = (pathid: number, border: Point [])=>{
    this.pathList[pathid].border = border;
  }

  setTranslate = (pathid: number, translate: {left: number, right: number,top: number,bottom: number}) =>{
    this.pathList[pathid].translate=translate;
  }
  setScalling = (pathid: number, scalling: string) => {
    if(pathid > -1){
      this.pathList[pathid].scalling = scalling;
    }
}
  setScaleY = (pathid: number,y: number) => {
    if(this.pathList[pathid].scalling.indexOf("top") !== -1){
      if(y > this.pathList[pathid].border[2].ctry){
        return
      }
      const preHeight = this.pathList[pathid].border[3].ctry - this.pathList[pathid].border[1].ctry;
      const height  =this.pathList[pathid].border[3].ctry - y;
      this.pathList[pathid].translate.top = preHeight - height;
      this.pathList[pathid].scaleY = height/preHeight;
    }
    else {
      if (y < this.pathList[pathid].border[0].ctry) {
        return
      }
      const preHeight = this.pathList[pathid].border[3].ctry - this.pathList[pathid].border[1].ctry;
      const height  = y - this.pathList[pathid].border[0].ctry;
      this.pathList[pathid].scaleY = height/preHeight;
      this.pathList[pathid].translate.bottom = height - preHeight;
    }

  }
  setDragPath = (pathid: number,x: number, y: number) => {
    this.pathList[pathid].dragPath = {x: x, y: y};
  }

  setScaleX = (pathid: number,x: number) => {
    if(this.pathList[pathid].scalling.indexOf("left") !== -1){
      if(x > this.pathList[pathid].border[1].ctrx){
        return
      }
      const preWidth = this.pathList[pathid].border[1].ctrx - this.pathList[pathid].border[0].ctrx;
      const width  =this.pathList[pathid].border[1].ctrx - x
      this.pathList[pathid].translate.left=preWidth-width;
      this.pathList[pathid].scaleX=width/preWidth;
    }
    else {
      if (x < this.pathList[pathid].border[0].ctrx) {
        return
      }
      const preWidth = this.pathList[pathid].border[1].ctrx - this.pathList[pathid].border[0].ctrx;
      const width  = x - this.pathList[pathid].border[0].ctrx;
      this.pathList[pathid].translate.right = width - preWidth;
      this.pathList[pathid].scaleX=width/preWidth;
    }

}
  setScale = (pathid: number,x: number ,y: number) => {
    this.pathList[pathid].scaleX = x;
    this.pathList[pathid].scaleY = y;
  }



scaleFinshX =(pathid: number, x: number) => {//du
    if(this.pathList[pathid].scalling.indexOf("left") !== -1) {
      const preWidth = this.pathList[pathid].border[1].ctrx - this.pathList[pathid].border[0].ctrx;
      const width = this.pathList[pathid].border[1].ctrx - x;
      const border = this.pathList[pathid].border[0].ctrx;
      for (let it of this.pathList[pathid].nodes) {
        it.posX = x + scallingPos(preWidth, width, it.posX, border);
        it.ctrPosX = x + scallingPos(preWidth, width, it.ctrPosX, border);
        if (it.ctr2PosX && it.ctr2PosY) {
          it.ctr2PosX = x + scallingPos(preWidth, width, it.ctr2PosX, border);
        }
        this.pathList[pathid].border[0].ctrx = x;
        this.pathList[pathid].border[3].ctrx = x;
        this.pathList[pathid].centerPoint.ctrx = (this.pathList[pathid].border[1].ctrx + x) / 2;
      }

    }
    else if(this.pathList[pathid].scalling.indexOf("right") !== -1){
      const preWidth = this.pathList[pathid].border[1].ctrx - this.pathList[pathid].border[0].ctrx;
      const width = x - this.pathList[pathid].border[0].ctrx ;
      const border = this.pathList[pathid].border[1].ctrx;
      for (let it of this.pathList[pathid].nodes) {
        it.posX = x + scallingPos(preWidth, width, it.posX, border);
        it.ctrPosX = x + scallingPos(preWidth, width, it.ctrPosX, border);
        if (it.ctr2PosX && it.ctr2PosY) {
          it.ctr2PosX = x + scallingPos(preWidth, width, it.ctr2PosX, border);
        }
        this.pathList[pathid].border[1].ctrx = x;
        this.pathList[pathid].border[2].ctrx = x;
        this.pathList[pathid].centerPoint.ctrx = (this.pathList[pathid].border[0].ctrx + x) / 2;
      }
    }
  this.pathList[pathid].scaleX=1;
  this.pathList[pathid].translate.left=0;
  this.pathList[pathid].translate.right=0;

}

  scaleFinshY =(pathid: number, y: number) => {
    if(this.pathList[pathid].scalling.indexOf("top") !== -1) {
      const preHeight = this.pathList[pathid].border[3].ctry - this.pathList[pathid].border[0].ctry;
      const height = this.pathList[pathid].border[3].ctry - y;
      const border = this.pathList[pathid].border[0].ctry;
      for (let it of this.pathList[pathid].nodes) {
        it.posY = y + scallingPos(preHeight, height, it.posY, border);
        it.ctrPosY = y + scallingPos(preHeight, height, it.ctrPosY, border);
        if (it.ctr2PosX && it.ctr2PosY) {
          it.ctr2PosY = y + scallingPos(preHeight, height, it.ctr2PosY, border);
        }
        this.pathList[pathid].border[0].ctry = y;
        this.pathList[pathid].border[1].ctry = y;
        this.pathList[pathid].centerPoint.ctry = (this.pathList[pathid].border[3].ctry + y) / 2;
      }
    }
    else if(this.pathList[pathid].scalling.indexOf("bottom") !== -1){
      const preHeight = this.pathList[pathid].border[3].ctry - this.pathList[pathid].border[0].ctry;
      const height = y - this.pathList[pathid].border[0].ctry ;
      const border = this.pathList[pathid].border[3].ctry;
      for (let it of this.pathList[pathid].nodes) {
        it.posY = y + scallingPos(preHeight, height, it.posY, border);
        it.ctrPosY = y + scallingPos(preHeight, height, it.ctrPosY, border);
        if (it.ctr2PosX && it.ctr2PosY) {
          it.ctr2PosY = y + scallingPos(preHeight, height, it.ctr2PosY, border);
        }
        this.pathList[pathid].border[3].ctry = y;
        this.pathList[pathid].border[2].ctry = y;
        this.pathList[pathid].centerPoint.ctry = (this.pathList[pathid].border[0].ctry + y) / 2;
      }
    }
    this.pathList[pathid].scaleY=1;
    this.pathList[pathid].translate.bottom=0;
    this.pathList[pathid].translate.top=0;

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
      case 'scale_origin':
        this.pathList[pathId].scale_origin = value;
        break;
      case 'scaleX':
        this.pathList[pathId].scaleX = Number(value);
        break;
      case 'scaleY':
        this.pathList[pathId].scaleY = Number(value);
        break;
      default:        
    }
    myIndexDB.update(this.pathList[pathId]);
  }
}

export const UIStore = new UIstore();