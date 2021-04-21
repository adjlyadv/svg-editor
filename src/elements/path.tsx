import React, { Fragment, useState } from 'react';
import { Node as typeNode, UIStore, Path as typePath } from '../stores/UIStore';
import { getRelativePositon, getCentralSymmetryPosition } from '../utils/calculate';
import Node from './node';
import _ from 'lodash';
import Bezier from 'bezier-js';
import { observer } from 'mobx-react';
import ScalingContainer from '../containers/ScalingContainer';

interface Props{
  path: typePath,
  pathId: number,
  currentTool:String;
}

const path: React.FC<Props> = observer((props: Props) => {
    
    const id = props.pathId;

    const getD = (nodes: string | any[], type: boolean) => {

      let d = "";
      const length = nodes.length;
      if(length === 1){//钢笔增加路径的时候对第一个节点的渲染
        return d;
      }
      for (let i = 0; i < nodes.length; i++) {
        if (i === 0) {
          d += `M ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctrPosX} ${nodes[i].ctrPosY} `
        } else if (i + 1 <= nodes.length - 1) {
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY} C ${nodes[i].ctr2PosX} ${nodes[i].ctr2PosY} `
        } else {
          d += `${nodes[i].ctrPosX} ${nodes[i].ctrPosY} ${nodes[i].posX} ${nodes[i].posY} `
        }
      }

      if (type) {
        const { ctr2PosX, ctr2PosY } = getCentralSymmetryPosition(nodes[0])
        d += `C ${nodes[length - 1].ctr2PosX} ${nodes[length - 1].ctr2PosY} 
          ${nodes[0].ctr2PosX ? nodes[0].ctr2PosX : ctr2PosX} ${nodes[0].ctr2PosY ? nodes[0].ctr2PosY : ctr2PosY} ${nodes[0].posX} ${nodes[0].posY} z`
      }

      return d
    }
    
    const getEditingPath = () => {
      let paths = [];
      let mockNode = null;

      for (let i = 0; i + 1 < nodes.length; i++) {

        if (i !== 0) {
          const node = nodes[i];
          mockNode = {
            posX: node.posX,
            posY: node.posY,
            ctrPosX: node.ctr2PosX,
            ctrPosY: node.ctr2PosY
          }
        }
        
        const _nodes = [
          mockNode ? mockNode : nodes[i], 
          nodes[i + 1]
        ]

        const attrD = getD(_nodes, false);
        paths.push({
          attrD: attrD,
          nodes: _nodes
        });
      }

      if (props.path.type) { // 判定一下是不是闭合路径，如果是的话需要另外的控制点
        let node = nodes[nodes.length - 1];
        const mockEndNode = {
          posX: node.posX,
          posY: node.posY,
          ctrPosX: node.ctr2PosX,
          ctrPosY: node.ctr2PosY
        }

        node = nodes[0];
        const mockStartNode = {
          posX: node.posX,
          posY: node.posY,
          ctrPosX: node.ctr2PosX,
          ctrPosY: node.ctr2PosY
        }

        const _nodes = [
          mockEndNode,
          mockStartNode
        ]

        const attrD = getD(_nodes, false);
        paths.push({
          attrD: attrD,
          nodes: _nodes
        });
      }

      return paths
    }

    const handleClick = (event: any) => {
      event.stopPropagation();
      UIStore.setEditingPath(id);
      UIStore.setPathBbox(event.target, id);//被点击的时候计算中心点
    }

    const handleOnMouseMove = _.throttle((event: any, item: any) => {
      event.stopPropagation();
      if(props.currentTool !== "pen_add_node"){
        return
      }
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
      if(props.currentTool !== "pen_add_node"){
        return
      }
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

    const [newNode, setNewNode] = useState<any>();
    const [bezier, setBezier] = useState<Bezier>();
    const { nodes } = props.path;

    if (props.currentTool === "pen_add_node" && UIStore.editingPathId === id) {
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
          {nodes.length && nodes.map((node, index) => 
            <Node node={node} id={index} pathId={id} />
          )}
          {newNode && <Node node={newNode} id={-1} pathId={-1} onClick={handleAddNewNodeClick} onMouseLeave={() => setNewNode(null)} />}
        </Fragment>
      )
    }

    if (props.currentTool === "mouse_rotate_path" && UIStore.editingPathId === id) {
      let rotate = `rotate(${props.path.rotate},${props.path.centerPoint.ctrx},${props.path.centerPoint.ctry})`;
      let borderD = `M ${props.path.border[0].ctrx} ${props.path.border[0].ctry}` 
                      +` C ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry}` 
                      +` C ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry}` 
                      +` C ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry}`
                      +` C ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`;
      return (
        <Fragment>
          <path transform={rotate} onClick={handleClick} d={getD(nodes, !!props.path.type)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke} fill={props.path.fill}/>
          <path d={borderD} transform={rotate} strokeWidth='2' stroke='#55f' fill='none' strokeDasharray='5'/>
        </Fragment>

      )
    }

  if (props.currentTool === "mouse_drag_path" && UIStore.editingPathId === id) {
    let translate=`translate(${props.path.dragPath.x},${props.path.dragPath.y})`
    let borderD = `M ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`
      +` C ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry}`
      +` C ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[1].ctrx} ${props.path.border[1].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry}`
      +` C ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[2].ctrx} ${props.path.border[2].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry}`
      +` C ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[3].ctrx} ${props.path.border[3].ctry} ${props.path.border[0].ctrx} ${props.path.border[0].ctry}`;

    return (
      <Fragment>
        <path transform={translate}onClick={handleClick} d={getD(nodes, !!props.path.type)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke} fill={props.path.fill}/>
        <path d={borderD} transform={translate} strokeWidth='2' stroke='#55f' fill='none' strokeDasharray='5'/>

      </Fragment>

    )
  }

  if (props.currentTool === "mouse_scaling_path" && UIStore.editingPathId === id) {
    if(props.path.border.length === 4) {
      let scale = `scale(${props.path.scaleX},${props.path.scaleY})`;
      return(
        <Fragment>
          <path  transform ={scale} vectorEffect="non-scaling-stroke" transform-origin={props.path.scale_origin}onClick={handleClick} d={getD(nodes, !!props.path.type)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke} fill={props.path.fill}/>
          <ScalingContainer pathId={id} path={props.path}/>
        </Fragment>
      )
    }
  }

    return (
      <Fragment>
        <path onClick={handleClick} d={getD(nodes, !!props.path.type)} strokeWidth={props.path.strokeWidth} stroke={props.path.stroke} fill={props.path.fill}/>
        {id === UIStore.editingPathId && nodes.length && nodes.map((node, index) => 
          <Node key={index} node={node} id={index} pathId={id} />
        )}
      </Fragment>
    )

  }
)


export default path;