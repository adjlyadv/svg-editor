import { Node } from '../stores/UIStore';

export function exportToSvg() {
  const editor = document.getElementById("editor");

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(editor!);

  source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');

  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  const blob = new Blob([source], {type: "text/plain"})
  const a = document.createElement('a');
  a.download = 'export.svg';
  a.href = window.URL.createObjectURL(blob);
  a.textContent = 'Download ready';
  a.dataset.downloadurl = ["text/plain", a.download, a.href].join(':');
  a.click();
}

export function importSvg() {
  let str = "M 379 451.5 C 362 542.5 643 364.5 562 456.5 C 481 548.5 653 543.5 653 543.5"
  decodeAttrD(str);
  
}

function decodeAttrD(str: string) {

  str = str.replace("M", "")
  const temp = str.split("C").map(item => item.trim().split(" ").map(num => parseFloat(num)))
  const nodes: Node[] = new Array(temp.length)

  for (let i = 0; i < temp.length; i++) {
      const data = temp[i];
      const preNode = i > 0 ? nodes[i - 1] : null;
      const node = nodes[i];
      if (i === 0) {
          node.posX = data[0]; // 起点单独判断
          node.posY = data[1];
          continue
      }
      
      if (preNode && i - 1 === 0) {
          preNode.ctrPosX = data[0]; //这里需要给前一个点赋值
          preNode.ctrPosY = data[1];
      } else {
          preNode!.ctr2PosX = data[0]; //这里需要给前一个点赋值
          preNode!.ctr2PosY = data[1];
      }

      node.posX = data[4]; //终点的x y
      node.posY = data[5];

      node.ctrPosX = data[2]; // 终点的控制点
      node.ctrPosY = data[3];
      
  }

  return nodes
}