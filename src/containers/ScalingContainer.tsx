import React, {Fragment, useEffect, useState} from 'react';
import {UIStore, Path as typePath} from '../stores/UIStore'
import '../style/ScalingContainer.scss'

interface Props{
  path: typePath,
  pathId: number,
}

const ScalingContainer:  React.FC<Props> = (props) => {

  useEffect(() => {
    setBorder(props.path.border);
    setTranslate(props.path.translate);
    setScale(`scale(${props.path.scaleX},${props.path.scaleY})`);
    setBorderD(`M ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`
      +` C ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry}`
      +` C ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry}`
      +` C ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry}`
      +` C ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`)


  }, [props])
  const [translate, setTranslate] = useState(props.path.translate);
  const [border, setBorder] = useState(props.path.border);
  const [scale, setScale] = useState(`scale(${props.path.scaleX},${props.path.scaleY})`);
  const [borderD,setBorderD] = useState<string>(`M ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`
    +` C ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry}`
    +` C ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry}`
    +` C ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry}`
    +` C ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`)


  const handleMouseDown = (event: any) => {
    event.stopPropagation();
    UIStore.setScalling(props.pathId, event.target.id);
    switch (event.target.id){
      case "left" :
      case "left_bottom" :
      case "bottom" :
        UIStore.setStateInfo(props.pathId, "scale_origin", `${props.path.border[1].ctrx} ${props.path.border[1].ctry}`);
        break;
      case "right" :
      case "right_bottom" :
        UIStore.setStateInfo(props.pathId, "scale_origin", `${props.path.border[0].ctrx} ${props.path.border[0].ctry}`);
        break;
      case "top" :
      case "left_top" :
        UIStore.setStateInfo(props.pathId, "scale_origin", `${props.path.border[2].ctrx} ${props.path.border[2].ctry}`);
        break;
      case "right_top" :
        UIStore.setStateInfo(props.pathId, "scale_origin", `${props.path.border[3].ctrx} ${props.path.border[3].ctry}`);
        break;

    }


  }


  return (
    <Fragment >
      <rect className='react' transform={`translate(${translate.left},${translate.top})`} id="left_top" x={props.path.border[0].ctrx-4} y={border[0].ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${translate.right},${translate.top})`}id="right_top" x={border[1].ctrx-4} y={border[1].ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${translate.right},${translate.bottom})`}id="right_bottom" x={border[2].ctrx-4} y={border[2].ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${translate.left},${translate.bottom})`}id="left_bottom" x={border[3].ctrx-4} y={border[3].ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${(translate.left+translate.right)/2},${translate.top})`}id="top" x={props.path.centerPoint.ctrx-4} y={border[0].ctry-4} onMouseDown={handleMouseDown} />
      <rect className='react' transform={`translate(${(translate.left+translate.right)/2},${translate.bottom})`}id="bottom" x={props.path.centerPoint.ctrx-4} y={border[3].ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${translate.left},${(translate.bottom+translate.top)/2})`}id="left" x={border[0].ctrx-4} y={props.path.centerPoint.ctry-4} onMouseDown={handleMouseDown}/>
      <rect className='react' transform={`translate(${translate.right},${(translate.bottom+translate.top)/2})`}id="right" x={border[1].ctrx-4} y={props.path.centerPoint.ctry-4} onMouseDown={handleMouseDown}/>
      <path id="scale_react" d={borderD} transform-origin={props.path.scale_origin} transform ={scale} strokeWidth='2' stroke='#55f' fill='none' strokeDasharray='5'/>
    </Fragment>

  )
}

export default ScalingContainer;