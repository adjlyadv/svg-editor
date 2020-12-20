import React from 'react';

interface Props {
  posX: number,
  posY: number
}

const node = (Porps: { posX: number; posY: number; }) => {

  const { posX, posY } = Porps;


  return(
    <circle onClick={(event) => console.log(event)} cx={posX} cy={posY} stroke="#55f" r="4">

    </circle>
  )

}

export default node;