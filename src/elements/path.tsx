import React, { Fragment, useState } from 'react';
import { Node as typeNode } from '../stores/UIStore';
import { getRelativePositon } from '../utils/calculate';
import Node from './node';
import _ from 'lodash';
import Bezier from 'bezier-js';
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
        } else if (i !== nodes.length - 1 && nodes[i].posX !== nodes[i - 1].posX) {
          const mockCtrX = nodes[i].posX * 2 - nodes[i].ctrPosX;
          const mockCtrY = nodes[i].posY * 2 - nodes[i].ctrPosY;
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY} C ${mockCtrX} ${mockCtrY} `
        } else {
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY}`
        }
      }
      
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

    const handleOnMouseMove = _.throttle((event: any, item: any) => {
      event.stopPropagation();
      const { x, y } = getRelativePositon(event);

      const nums = item.nodes.reduce((pre: Array<number>, cur: typeNode, index: number) => {
        if (index === item.nodes.length - 1) {
          pre.push(cur.ctrPosX, cur.ctrPosY, cur.posX, cur.posY);
        } else {
          pre.push(cur.posX, cur.posY, cur.ctrPosX, cur.ctrPosY);
        }

        return pre
      }, []).flat(1);

      const bezier = new Bezier(nums);
      setBezier(bezier);
      const nodeInfo = bezier.project({x, y});

      setNewNode({
        posX: nodeInfo.x,
        posY: nodeInfo.y,
        ctrPosX: nodeInfo.x,
        ctrPosY: nodeInfo.y,
        t: nodeInfo.t
      })

    }, 50);

    const handleAddNewNode = () => {
      const points = bezier?.split(newNode.t).left.points;
      console.log(points)
      console.log(newNode)

      // let temp = bezier?.derivative(newNode.t);
      // if (!temp) {
      //   return
      // }
      // let temp1 = Math.sqrt(temp?.x * temp?.x + temp?.y * temp?.y);

      // console.log(newNode);
      // console.log(newNode.posX + temp?.x / temp1, newNode.posY + temp?.y / temp1)

      // if (!points) {
      //   return
      // }

      // const index = nodes.findIndex((node) => {
      //   return node.posX === bezier?.points[0].x && node.posY === bezier?.points[0].y
      // });

      // let node = {
      //   posX: points[0].x,
      //   posY: points[0].y,
      //   ctrPosX: points[0].x *2 - points[1].x,
      //   ctrPosY: points[0].y *2 - points[1].y
      // }

      // UIStore.setNodes(id, index, node)

      // UIStore.addNodes(id, points[3].x, points[3].y, points[2].x, points[2].y, index + 1);
    }

    const [editing, setEditing] = useState<boolean>(false);
    const [newNode, setNewNode] = useState<any>();
    const [bezier, setBezier] = useState<Bezier>();
    const { id, nodes } = props.path;

    if (!editing) {
      return (
        <Fragment>
          <path onDoubleClick={handleDoubleClick} onClick={handleClick} d={getD(nodes)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke} fill={props.path.fill}/>
        </Fragment>
      );
    }

    const paths = getEditingPath();

    return (
      <Fragment>
        {
          paths.map(item => 
            <Fragment>
              <path key={item.attrD} onClick={handleClick} d={item.attrD} onMouseOver={e => handleOnMouseMove(e, item)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke}fill={props.path.fill}/>
              {nodes.map((node, index) => 
                <Node node={node} id={index} pathId={id} />
              )}
            </Fragment>
          )
        }
        {newNode && <Node node={newNode} id={-1} pathId={-1} onClick={handleAddNewNode} />}
      </Fragment>
    )


  }
)


export default path;