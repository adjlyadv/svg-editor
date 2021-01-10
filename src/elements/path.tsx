import React, { Fragment } from 'react';
import { Node as typeNode } from '../stores/UIStore'
import Node from './node';
// import Bezier from 'bezier-js';
import { observer } from 'mobx-react';

interface Props{
  path: {
    id: number,
    nodes: typeNode[],
  }
}

interface State{
  editing: boolean
}

@observer
class path extends React.Component<Props, State> {

  constructor(Props: Props | Readonly<Props>) {
    super(Props);
    this.state = {
      editing: false
    }
  }

  getD = (nodes: string | any[]) => {

    let d = "";
    for (let i = 0; i < nodes.length; i++) {
      if (i === 0) {
        d += `M ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctrPosX} ${nodes[i].ctrPosY} `
      } else {
        d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY}`
      }
    }
    console.log(d)
    
    return d
  }

  render() {

    const { id, nodes } = this.props.path;

    // M157.5,105.5C180.66667,95 148.83333,76.5 227,74C305.16667,71.5 266.5,82.5 251.5,115.5C236.5,148.5 236.5,148.5 236,148C235.5,147.5 143.5,203.5 166,151

    if (this.state.editing) {
      return 
    }


    return (
      <Fragment>
        {nodes.map((node, index) => 
          <Node node={node} id={index} pathId={id} />
        )}
        {/* <circle cx={this.state.x} cy={this.state.y} stroke="#55f" r="4" />
        <circle cx={this.state.ctrX} cy={this.state.ctrY} stroke="#55f" r="4" /> */}
       
        <path d={this.getD(nodes)} strokeWidth="5" stroke="#000000" fill="none"/>
        
        {/* <path onClick={handleOnclick} onMouseMove={handleMouse} onMouseLeave={() => console.log("leave path")} strokeWidth="5" stroke="#000000" fill="none" d="M157.5,105.5C180.66667,95 148.83333,76.5 227,74C305.16667,71.5 266.5,82.5 251.5,115.5C236.5,148.5 236.5,148.5 236,148C235.5,147.5 143.5,203.5 166,151"></path> */}
      </Fragment>
    );
  }

}


export default path;