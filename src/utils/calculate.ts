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