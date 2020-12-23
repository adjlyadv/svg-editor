import React, { Fragment } from 'react';
import '../style/statusContainer.scss';
export default class StatusContainer extends React.Component {

  //值的初始值
  defaultProps = {
    X:100,
    Y:200,
    fill:"#ffffff",
    strokeSize:5,
    strokeColor:"#000000"
  }

  inputChange = (event: any) => {
    console.log(event.target.name,event.target.value)//拿到设定的值
  }

  render() {
    return(
      <Fragment>
        <div className = "statusContainer">
            <h4>状态栏</h4>
            <label className = "statusinput">
              <span>PositionX:</span>
              <input type="number"  name="X" defaultValue={this.defaultProps.X} onChange={this.inputChange}/>
            </label>
            <label className = "statusinput">
              <span>PositionY:</span>
              <input type="number" name="Y" defaultValue = {this.defaultProps.Y} onChange = {this.inputChange}/>
            </label>
            <label className = "statusinput">
              <span>fill:</span>
              <input type="color" name="fill" defaultValue = {this.defaultProps.fill} onChange = {this.inputChange}/>
            </label>
            <label className = "statusinput">
              <span>stroke size:</span>
              <input type="number" name="strokeSize" defaultValue = {this.defaultProps.strokeSize} onChange = {this.inputChange}/>
            </label>
            <label className = "statusinput">
              <span>stroke color:</span>
              <input type="color" name="strokeColor" defaultValue = {this.defaultProps.strokeColor} onChange = {this.inputChange}/>
            </label>
        </div>
      </Fragment>
    )
  }

}
