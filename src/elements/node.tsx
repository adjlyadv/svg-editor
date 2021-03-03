import { observer} from 'mobx-react';
import React, { Fragment } from 'react';
import { nodeTypes } from './constants';
import { Node as typeNode, UIStore } from '../stores/UIStore';

interface Props {
  node: typeNode,
  id: number,
  pathId: number,
  onClick?: any,
  onMouseLeave?: any,
}

const Node = observer((props: Props) => {

  if (props.id === -1) {
    return (
      <circle onClick={props.onClick} onMouseLeave={props.onMouseLeave} className="point-control-add" cx={props.node.posX} cy={props.node.posY} />
    )
  }

  const node = UIStore.pathList[props.pathId].nodes[props.id];
  const mouseEvent = UIStore.mouseState;
  const isEditingNode = mouseEvent.pathid === props.pathId && mouseEvent.nodeid === props.id;
  const currentTool = UIStore.currentTool;

  const handleMouseDown = (elec:number, event: any) => {

    if (currentTool === "pen_new_path") {
      UIStore.pathList[props.pathId].type = 1; //设定成闭合
    }

    switch(elec) {
      case nodeTypes.AnchorPoint: {
        UIStore.setMouseState(nodeTypes.AnchorPoint, true, props.pathId, props.id);
        break;
      }

      case nodeTypes.Ctr1Point: {
        UIStore.setMouseState(nodeTypes.Ctr1Point, true, props.pathId, props.id);
        break;
      }

      case nodeTypes.Ctr2Point: {
        UIStore.setMouseState(nodeTypes.Ctr2Point, true, props.pathId, props.id);
        break
      }
    }
  }
  
  return(
    <Fragment>
      <circle className="point-control" onMouseDown={(e) => handleMouseDown(nodeTypes.AnchorPoint, e)} cx={node.posX} cy={node.posY} />
      
      { isEditingNode && <line x1={node.posX} y1={node.posY} x2={node.ctrPosX} y2={node.ctrPosY} stroke="#555" strokeWidth="1" /> }
      { isEditingNode && <circle className="point-control" onMouseDown={(e) => handleMouseDown(nodeTypes.Ctr1Point, e)} cx={node.ctrPosX} cy={node.ctrPosY} /> }
      

      {isEditingNode && mouseEvent.nodeid === props.id && node.ctr2PosX && node.ctr2PosY && <circle className="point-control" onMouseDown={(e) => handleMouseDown(nodeTypes.Ctr2Point, e)} cx={node.ctr2PosX} cy={node.ctr2PosY} />}
      {isEditingNode && mouseEvent.nodeid === props.id && node.ctr2PosX && node.ctr2PosY && <line x1={node.posX} y1={node.posY} x2={node.ctr2PosX} y2={node.ctr2PosY} stroke="#555" strokeWidth="1" />}
    </Fragment>
  )

})

export default Node;