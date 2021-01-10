import React from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";
import '../style/BasicContainer.scss'

export default class BasicLayout extends React.Component<any,any> {

    constructor(props:any){
        super(props)
        this.state={
            currentTool:"mouse",
        }
    }

    setCurrenttool(msg:any){
        this.setState({
            currentTool:msg,
        })
    }

  render() {
    return(
      <div className="basic-container">
        <ToolbarContainer currentTool={this.state.currentTool} set={this.setCurrenttool.bind(this)}/>
        <EditorContainer />
        <StatusContainer />
      </div>
    )
  }

}
