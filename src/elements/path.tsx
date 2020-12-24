import React, { Fragment } from 'react';
import Node from './node';
import Bezier from 'bezier-js';

interface Props{
 
}

interface State{
  x: number,
  y: number,
  t: any,
  ctrX: number,
  ctrY: number,
  editing: boolean
}

class path extends React.Component<Props, State> {

  constructor(Props: Props | Readonly<Props>) {
    super(Props);

    this.state = {
      x: 0,
      y: 0,
      t: null,
      ctrX: 0,
      ctrY: 0,
      editing: false
    }

    const b = new Bezier(135.5, 77.5, 252.5, 36.5, 219.5, 85.5)
    console.log(b.project({x: 135.5, y: 77.5}))

  }
  

  public render() {
    const b = new Bezier(157.5, 105.5, 180, 95, 148, 76.5);

    const mockNodes = [
      {
        posX: 157.5,
        posY: 105.5,
        ctrPosX: 180,
        ctrPosY: 95,
      },
      {
        posX: 148.8,
        posY: 76.5,
        ctrPosX: 227,
        ctrPosY: 74,
      },
    ];

    // M157.5,105.5C180.66667,95 148.83333,76.5 227,74C305.16667,71.5 266.5,82.5 251.5,115.5C236.5,148.5 236.5,148.5 236,148C235.5,147.5 143.5,203.5 166,151

    const handleMouse = (event: { clientX: number; clientY: any; }) => {
      console.log(event.clientX - 428, event.clientY); 
      const res = b.project({x: event.clientX - 428, y: event.clientY})
      console.log(b.project({x: event.clientX - 428, y: event.clientY}))
      console.log(b.toSVG())
      this.setState({x: res.x, y: res.y, t: res.t}) 
    }

    const handleOnclick = () => {
      const c = b.split(0, this.state.t);
      this.setState({ ctrX: c.points[1].x, ctrY: c.points[1].y })
    }

    if (this.state.editing) {
      return 
    }

    const getD = (nodes: string | any[]) => {

      let d = "";
      for (let i = 0; i < nodes.length; i++) {
        if (i === 0) {
          d += `M ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctrPosX} ${nodes[i].ctrPosY} `
        } else {
          d += `${nodes[i].posX} ${nodes[i].posY} ${nodes[i].ctrPosX} ${nodes[i].ctrPosY}`
        }

        // temp.push(nodes[i].posX, nodes[i].posY, nodes[i].ctrPosX, nodes[i].ctrPosY)
      }
      console.log(d)
      
      return d
    }

    return (
      <Fragment>
        {mockNodes.map(item => 
          <Fragment>
            <Node posX={item.posX} posY={item.posY} ctrPosX={item.ctrPosX} ctrPosY={item.ctrPosY} />
          </Fragment>
          )}
        {/* <circle cx={this.state.x} cy={this.state.y} stroke="#55f" r="4" />
        <circle cx={this.state.ctrX} cy={this.state.ctrY} stroke="#55f" r="4" /> */}
       
        <path d={getD(mockNodes)} stroke-width="5" stroke="#000000" fill="none"/>
        
        <path onClick={handleOnclick} onMouseMove={handleMouse} onMouseLeave={() => console.log("leave path")} stroke-width="5" stroke="#000000" fill="none" d="M157.5,105.5C180.66667,95 148.83333,76.5 227,74C305.16667,71.5 266.5,82.5 251.5,115.5C236.5,148.5 236.5,148.5 236,148C235.5,147.5 143.5,203.5 166,151"></path>
      </Fragment>
    );
  }

}


export default path;