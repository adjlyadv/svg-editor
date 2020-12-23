import React, { Fragment } from 'react';

interface Props {
  posX: number,
  posY: number,
  ctrPosX: number,
  ctrPosY: number
}

const node = (props: Props) => {

  const { posX, posY, ctrPosX, ctrPosY } = props;

  const handleNodeClick = (event: any) => {
    event.stopPropagation();
    console.log(event)
  }


  return(
    <Fragment>
      <circle onClick={handleNodeClick} cx={posX} cy={posY} stroke="#55f" r="4" />
        <line x1={posX} y1={posY} x2={ctrPosX} y2={ctrPosY} />
      <circle onClick={handleNodeClick} cx={ctrPosX} cy={ctrPosY} stroke="#55f" r="4" />
    </Fragment>
  )

}

export default node;