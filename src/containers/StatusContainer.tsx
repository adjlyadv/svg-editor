import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import '../style/statusContainer.scss';
import { UIStore } from '../stores/UIStore';

interface Props{
  currentPathid:number;
}

const StatusContainer: React.FC<Props> = observer((props: Props) => {
  
  const inputChange = (event: any) => {
    let name = event.target.name;
    let value = event.target.value;
    if(props.currentPathid!== -1){
      UIStore.setStateInfo(props.currentPathid,name,value);
    }
  }
  let pathInfo;
  if(props.currentPathid!== -1){
     pathInfo = UIStore.pathList[props.currentPathid];
  }
    
  return (
    <Fragment>
      <div className = "statusContainer">
          <h4>状态栏</h4>
          <label className = "statusinput">
            <span>PositionX:</span>
            <input type="number"  name="X"  onChange={inputChange}/>
          </label>
          <label className = "statusinput">
            <span>PositionY:</span>
            <input type="number" name="Y"  onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>fill:</span>
            <input type="color" name="fill" value = {pathInfo?.fill} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke Width:</span>
            <input type="number" name="strokeWidth" value = {pathInfo?.strokeWidth} min = "0" max = "40"  onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke:</span>
            <input type="color" name="stroke" value = {pathInfo?.stroke}  onChange = {inputChange}/>
          </label>
      </div>
    </Fragment>
  )

})

export default StatusContainer;
