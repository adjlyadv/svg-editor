import { observer} from 'mobx-react';
import React, { Fragment } from 'react';
import { Node as typeNode, UIStore } from '../stores/UIStore';

interface Props {
  node: typeNode,
  id: number,
  pathId: number
}

const Node = observer((props: Props) => {

  const node = UIStore.pathList[props.pathId].nodes[props.id]; 

  const handleMouseDown = (elec:boolean, event: any) => {
    if(elec){
      UIStore.setMouseState(true,true,props.pathId,props.id);
      console.log("按下去锚点属于路径"+props.pathId+"的锚点"+props.id);
    }else{
      UIStore.setMouseState(false,true,props.pathId,props.id);
      console.log("按下去控制点属于路径"+props.pathId+"的锚点"+props.id)
    }
  }
  
  return(
    <Fragment>
      <circle className="point-control" onMouseDown={(e) => handleMouseDown(true, e)} cx={node.posX} cy={node.posY} stroke="#55f" r="4" />
        <line x1={node.posX} y1={node.posY} x2={node.ctrPosX} y2={node.ctrPosY} stroke="#555" strokeWidth="1" />
      <circle className="point-control" onMouseDown={(e) => handleMouseDown(false, e)} cx={node.ctrPosX} cy={node.ctrPosY} stroke="#55f" r="4" />
    </Fragment>
  )

})

export default Node;