import { observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { Node as typeNode, UIStore } from '../stores/UIStore';
import { getRelativePositon } from '../utils/calculate';

interface Props {
  node: typeNode,
  id: number,
  pathId: number
}


const Node = observer((props: Props) => {

  const [draging, setDraging ] = useState<boolean>(false);
  const [node, setNode] = useState<typeNode>(props.node);


  const handleMouseDown = (event: any) => {
    event.stopPropagation();
    setDraging(true)
    
  }

  const handleMouseMove = (event: any) => {
    event.stopPropagation();
    if (!draging) {
      return
    }

    const { x, y } = getRelativePositon(event);
    setNode({
      posX: x,
      posY: y,
      ctrPosX: node.ctrPosX,
      ctrPosY: node.ctrPosY
    })

    UIStore.setNodes(0, props.id, node) // 需要进行节流
  }

  const handleMouseUp = (event: any) => {
    event.stopPropagation();
    setDraging(false);
  }


  return(
    <Fragment>
      <circle onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} cx={node.posX} cy={node.posY} stroke="#55f" r="4" />
        <line x1={node.posX} y1={node.posY} x2={node.ctrPosX} y2={node.ctrPosY} stroke="#555" strokeWidth="1" />
      <circle cx={node.ctrPosX} cy={node.ctrPosY} stroke="#55f" r="4" />
    </Fragment>
  )

})

export default Node;