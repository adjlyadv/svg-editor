import React, { Fragment, useState } from 'react';
import { Node as typeNode } from '../stores/UIStore'
import Node from './node';
// import Bezier from 'bezier-js';
import { observer } from 'mobx-react';

interface Props{
  path: {
    id: number,
    nodes: typeNode[],
    strokeWidth: number,
    stroke: string,
    fill:string
  }
  setPathid:(arg0: number)=>void;
  currentTool:String;
}

const path: React.FC<Props> = observer((props: Props) => {
    
    const getD = (nodes: string | any[]) => {

      let d = "";
      for (let i = 0; i < nodes.length; i++) {
        if (i === 0) {
          d += `M ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctrPosX} ${nodes[i].ctrPosY} `
        } else if (i !== nodes.length - 1) {
          const mockCtrX = nodes[i].posX * 2 - nodes[i].ctrPosX;
          const mockCtrY = nodes[i].posY * 2 - nodes[i].ctrPosY;
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY} C ${mockCtrX} ${mockCtrY} `
        } else {
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY}`
        }
      }
      console.log(d)
      
      return d
    }
    
    const getEditingPath = () => {
      let paths = [];
      let mockNode = null;

      for (let i = 0; i + 1 < nodes.length; i++) {

        if (i !== 0 && i + 1 !== nodes.length) {
          const node = nodes[i];
          const mockCtrX = nodes[i].posX * 2 - nodes[i].ctrPosX;
          const mockCtrY = nodes[i].posY * 2 - nodes[i].ctrPosY;

          mockNode = {
            posX: node.posX,
            posY: node.posY,
            ctrPosX: mockCtrX,
            ctrPosY: mockCtrY
          }
        }


        const attrD = getD([mockNode ? mockNode : nodes[i], nodes[i + 1]]);
        paths.push({
          attrD: attrD,
          nodes: [
            mockNode ? mockNode : nodes[i], 
            nodes[i + 1]
          ],
        });
      }

      return paths
    }
    
    const handleDoubleClick = (event: any) => {
      event.stopPropagation();
      if(props.currentTool === 'mouse')
        setEditing(true);
    }

    const handleClick = (event: any) => {
      event.stopPropagation();
      props.setPathid(props.path.id);
    }


    const [editing, setEditing] = useState<boolean>(false);
    const { id, nodes } = props.path;

    if (!editing) {
      return (
        <Fragment>
          <path onDoubleClick={handleDoubleClick} onClick={handleClick} d={getD(nodes)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke}fill={props.path.fill}/>
        </Fragment>
      );
    }

    const paths = getEditingPath();

    return (
      <Fragment>
        {
          paths.map(item => 
            <Fragment>
              <path d={item.attrD} onClick={handleClick} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke}fill={props.path.fill}/>
              {nodes.map((node, index) => 
                <Node node={node} id={index} pathId={id} />
              )}
            </Fragment>
          )
        }
      </Fragment>
    )


  }
)


export default path;