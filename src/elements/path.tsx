import React, { Fragment, useState } from 'react';
import { Node as typeNode, UIStore } from '../stores/UIStore';
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
        } else if (i + 1 <= nodes.length - 1) {
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctr2PosX} ${nodes[i].ctr2PosY} `
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

          mockNode = {
            posX: node.posX,
            posY: node.posY,
            ctrPosX: node.ctr2PosX,
            ctrPosY: node.ctr2PosY
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

    const handleAddNewNodeClick = () => {
      const newPath = bezier?.split(newNode.t); // 这里贝塞尔曲线被分成了两个部分，需要分别更新左右两端
      let points = newPath?.left.points; // 0 1 2 3 分别是第一个点的位置、控制点，第二个点的控制点、位置

      if (!newPath || !points) {
        return
      }

      let index = nodes.findIndex((node) => {
        return node.posX === bezier?.points[0].x && node.posY === bezier?.points[0].y
      });

      let node = {
        posX: points[0].x,
        posY: points[0].y,
        ctrPosX: index ? UIStore.pathList[id].nodes[index].ctrPosX : points[1].x,
        ctrPosY: index ? UIStore.pathList[id].nodes[index].ctrPosY : points[1].y,
        ctr2PosX: index ? points[1].x : undefined,
        ctr2PosY: index ? points[1].y : undefined
      } // 这里要判定一下index为0  即起始节点的情况，做特殊处理

      let addingNode = {
        posX: points[3].x,
        posY: points[3].y,
        ctrPosX: points[2].x,
        ctrPosY: points[2].y,
        ctr2PosX: 0,
        ctr2PosY: 0
      } // 这是新的节点信息

      UIStore.setNodes(id, index, node); // 更新左端点

      points = newPath?.right.points;

      node = {
        posX: points[3].x,
        posY: points[3].y,
        ctrPosX: points[2].x,
        ctrPosY: points[2].y,
        ctr2PosX: UIStore.pathList[id].nodes[index + 1].ctr2PosX || undefined,
        ctr2PosY: UIStore.pathList[id].nodes[index + 1].ctr2PosY || undefined
      }

      addingNode.ctr2PosX = points[1].x;
      addingNode.ctr2PosY = points[1].y; // 新的节点信息需要左右两端的
      
      UIStore.setNodes(id, index + 1, node); // 更新右端点

      UIStore.addNodes(id, addingNode.posX, addingNode.posY, addingNode.ctrPosX, addingNode.ctrPosY, addingNode.ctr2PosX, addingNode.ctr2PosY, index + 1);
      setNewNode(null);
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
            </Fragment>
          )
        }
        {nodes.map((node, index) => 
          <Node node={node} id={index} pathId={id} />
        )}
        {newNode && <Node node={newNode} id={-1} pathId={-1} onClick={handleAddNewNodeClick} onMouseLeave={() => setNewNode(null)} />}
      </Fragment>
    )


  }
)


export default path;