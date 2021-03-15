import { UIStore, Node } from '../stores/UIStore'

export function getRelativePositon(event: any) {
  const editorInfo = UIStore.editorInfo;
  return {
    x: event.clientX - editorInfo.left,
    y: event.clientY - editorInfo.top
  }
}

export function getCentralSymmetryPosition(node: Node) {
  return {
    ctr2PosX: node.posX * 2 - node.ctrPosX,
    ctr2PosY: node.posY * 2 - node.ctrPosY
  }
}

export function getAngle(node:Node){
  const dot = node.posX * node.ctrPosX + node.posY * node.ctrPosY
  const det = node.posX * node.ctrPosY - node.posY * node.ctrPosY
  const angle = Math.atan2(det, dot) / Math.PI * 180
  return (angle + 360) % 360
}

export function calRotatePath(pathid:number){
  const path = UIStore.pathList[pathid];
  const angle = path.rotate;
  const center = path.centerPoint;
  const border = path.border;

  const  l = (angle * Math.PI) / 180;
  const  cosv =  Math.cos(l);
  const  sinv =  Math.sin(l);

  let newNode = {
    posX:-1,
    posY:-1,
    ctrPosX: -1,
    ctrPosY: -1,
    ctr2PosX: -1,
    ctr2PosY: -1
  }
  path.nodes.forEach((item,index)=>{
    newNode.posX = (item.posX - center.ctrx) * cosv - (item.posY - center.ctry) * sinv + center.ctrx;
    newNode.posY =  (item.posX - center.ctrx) * sinv + (item.posY - center.ctry) * cosv + center.ctry;      
    newNode.ctrPosX = (item.ctrPosX - center.ctrx) * cosv - (item.ctrPosY - center.ctry) * sinv + center.ctrx;
    newNode.ctrPosY = (item.ctrPosX - center.ctrx) * sinv + (item.ctrPosY - center.ctry) * cosv + center.ctry;
    if(item.ctr2PosX && item.ctr2PosY){
      newNode.ctr2PosX = (item.ctr2PosX - center.ctrx) * cosv - (item.ctr2PosY - center.ctry) * sinv + center.ctrx;
      newNode.ctr2PosY =  (item.ctr2PosX - center.ctrx) * sinv + (item.ctr2PosY - center.ctry) * cosv + center.ctry;
      UIStore.setNodes(pathid,index,newNode);
    }else{
      UIStore.setNodes(pathid,index,{posX:newNode.posX, posY:newNode.posY, ctrPosX: newNode.ctrPosX, ctrPosY:newNode.ctrPosY });
    }
  })

  let newBorder = [{ctrx:-1, ctry:-1},{ctrx:-1, ctry:-1},{ctrx:-1, ctry:-1},{ctrx:-1, ctry:-1}];
  border.forEach((item,index)=>{
    newBorder[index].ctrx = (item.ctrx - center.ctrx) * cosv - (item.ctry - center.ctry) * sinv + center.ctrx;
    newBorder[index].ctry = (item.ctrx - center.ctrx) * sinv + (item.ctry - center.ctry) * cosv + center.ctry;
  })
  UIStore.setBorder(pathid,newBorder);
}


export function getCircleNodes(node: Node){
  const C = 0.552284749831;  
  let {posX,posY,ctrPosY,ctrPosX} = node;
  let radius = Math.sqrt((posX-ctrPosX)*(posX-ctrPosX) + (posY-ctrPosY)* (posY-ctrPosY));
  let h = C * radius; 

  let nodes = [];
  nodes[0] = {
    posX:posX,
    posY:posY + radius,
    ctrPosX:posX + h,
    ctrPosY:posY + radius,
    ctr2PosX: posX - h,
    ctr2PosY: posY + radius,
  }
  nodes[1] = {
    posX:posX + radius,
    posY:posY,
    ctrPosX: posX + radius,
    ctrPosY: posY + h,
    ctr2PosX:posX + radius,
    ctr2PosY:posY - h
  }
  nodes[2] = {
    posX:posX,
    posY:posY - radius,
    ctrPosX: posX + h,
    ctrPosY: posY - radius,
    ctr2PosX:posX - h,
    ctr2PosY:posY - radius
  }
  nodes[3] = {
    posX:posX - radius,
    posY:posY,
    ctrPosX: posX - radius,
    ctrPosY: posY - h,
    ctr2PosX:posX - radius,
    ctr2PosY:posY + h
  }

  return nodes;
}


export function getRectNodes(node: Node){ 
  let {posX,posY,ctrPosY,ctrPosX} = node;

  let nodes = [];
  nodes[0] = {
    posX:posX,
    posY:posY,
    ctrPosX:posX,
    ctrPosY:posY,
    ctr2PosX:posX,
    ctr2PosY:posY
  }
  nodes[1] = {
    posX:ctrPosX,
    posY:posY,
    ctrPosX: ctrPosX,
    ctrPosY: posY,
    ctr2PosX:ctrPosX,
    ctr2PosY:posY
  }
  nodes[2] = {
    posX:ctrPosX,
    posY:ctrPosY,
    ctrPosX:ctrPosX,
    ctrPosY:ctrPosY,
    ctr2PosX:ctrPosX,
    ctr2PosY:ctrPosY
  }
  nodes[3] = {
    posX:posX,
    posY:ctrPosY,
    ctrPosX: posX,
    ctrPosY: ctrPosY,
    ctr2PosX:posX,
    ctr2PosY:ctrPosY
  }
  return nodes;
}
export function scallingPos(pre: number, now: number, pos:number, border: number){
  if(pos === border){
    return 0;
  }
  return (pos-border)/pre*now;
}

export function genID(){
  return Number(Math.random().toString().substr(3, 18) + Date.now()).toString(36);
}
