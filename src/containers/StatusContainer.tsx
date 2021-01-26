
import React, { Fragment } from 'react';
import '../style/statusContainer.scss';
import { UIStore } from '../stores/UIStore';

const StatusContainer: React.FC<{}> = () => {
  
  const inputChange = (event: any) => {
    let name = event.target.name;
    let value = event.target.value;
      UIStore.setStateInfo(0,name,value);
  }

  const pathInfo = UIStore.pathList[0];

  return (
    <Fragment>
      <div className = "statusContainer">
          <h4>状态栏</h4>
          <label className = "statusinput">
            <span>PositionX:</span>
            <input type="number"  name="X" defaultValue={pathInfo.nodes[0].posX} onChange={inputChange}/>
          </label>
          <label className = "statusinput">
            <span>PositionY:</span>
            <input type="number" name="Y" defaultValue = {pathInfo.nodes[0].posY} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>fill:</span>
            <input type="color" name="fill" defaultValue = {pathInfo.fill} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke Width:</span>
            <input type="number" name="strokeWidth" min = "0" max = "40" defaultValue = {pathInfo.strokeWidth} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke:</span>
            <input type="color" name="stroke" defaultValue = {pathInfo.stroke} onChange = {inputChange}/>
          </label>
      </div>
    </Fragment>
  )

}

export default StatusContainer;
