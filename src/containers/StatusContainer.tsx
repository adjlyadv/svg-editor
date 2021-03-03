import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import '../style/statusContainer.scss';
import { UIStore } from '../stores/UIStore';

interface Props{
  
}

const StatusContainer: React.FC<Props> = observer((props: Props) => {

  const currentPathid = UIStore.editingPathId
  
  const inputChange = (event: any) => {
    let name = event.target.name;
    let value = event.target.value;
    if(currentPathid!== -1){
      UIStore.setStateInfo(currentPathid,name,value);
    }
  }
  let pathInfo:any;
  if(currentPathid !== -1){
     pathInfo = UIStore.pathList[currentPathid].nodes.length ? UIStore.pathList[currentPathid]: null;
  }
    
  return (
    <Fragment>
      <div className = "statusContainer">
          <h4>状态栏</h4>
          <label className = "statusinput">
            <span>PositionX:</span>
            <input type="number"  name="X" value = {pathInfo?pathInfo.nodes[0].posX.toFixed(1):0} onChange={inputChange}/>
          </label>
          <label className = "statusinput">
            <span>PositionY:</span>
            <input type="number" name="Y"  value = {pathInfo?pathInfo.nodes[0].posY.toFixed(1):0} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>fill:</span>
            <input type="color" name="fill" value = {(!pathInfo || pathInfo.fill === 'none')?'#ffffff':pathInfo.fill} onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke Width:</span>
            <input type="number" name="strokeWidth" value = {pathInfo?pathInfo.strokeWidth:0} min = "0" max = "40"  onChange = {inputChange}/>
          </label>
          <label className = "statusinput">
            <span>stroke:</span>
            <input type="color" name="stroke" value = {pathInfo?pathInfo.stroke:'#000000'}  onChange = {inputChange}/>
          </label>
      </div>
    </Fragment>
  )

})

export default StatusContainer;
