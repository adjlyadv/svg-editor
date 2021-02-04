import { observer} from 'mobx-react';
import React, { Fragment } from 'react';
import { nodeTypes } from './constants';
import { Node as typeNode, UIStore } from '../stores/UIStore';

interface Props {
  node: typeNode,
  id: number,
  pathId: number,
  onClick?: any,
  onMouseLeave?: any
}

const Node = observer((props: Props) => {

  if (props.id === -1) {
    return (
      <circle onClick={props.onClick} onMouseLeave={props.onMouseLeave} className="point-control-add" cx={props.node.posX} cy={props.node.posY} />
    )
  }

  const node = UIStore.pathList[props.pathId].nodes[props.id];

  const handleMouseDown = (elec:number, event: any) => {
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
        <line x1={node.posX} y1={node.posY} x2={node.ctrPosX} y2={node.ctrPosY} stroke="#555" strokeWidth="1" />
      <circle className="point-control" onMouseDown={(e) => handleMouseDown(nodeTypes.Ctr1Point, e)} cx={node.ctrPosX} cy={node.ctrPosY} />

      {node.ctr2PosX && node.ctr2PosY && <circle className="point-control" onMouseDown={(e) => handleMouseDown(nodeTypes.Ctr2Point, e)} cx={node.ctr2PosX} cy={node.ctr2PosY} />}
      {node.ctr2PosX && node.ctr2PosY && <line x1={node.posX} y1={node.posY} x2={node.ctr2PosX} y2={node.ctr2PosY} stroke="#555" strokeWidth="1" />}
    </Fragment>
  )

})

export default Node;