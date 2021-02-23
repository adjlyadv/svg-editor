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

export function getCircleNodes(node: Node){
  const C = 0.552284749831;  
  let {posX,posY,ctrPosY,ctrPosX} = node;
  let radius = Math.sqrt((posX-ctrPosX)*(posX-ctrPosX) + (posY-ctrPosY)* (posY-ctrPosY));
  let h = C * radius; 

  let nodes = [];
  nodes[0] = {
    posX:posX,
    posY:posY + radius,
    ctrPosX: posX - h,
    ctrPosY: posY + radius,
    ctr2PosX:posX + h,
    ctr2PosY:posY + radius
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