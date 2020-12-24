import { action, observable } from 'mobx';

export interface Node {
  posX: number,
  posY: number,
  ctrPosX: number,
  ctrPosY: number
}

export interface Path {
  id: number,
  nodes: Node[],
}

class UIstore {
  @observable editorInfo = {
    width: 800,
    height: 600
  }
  @observable pathList: Path[] = [];
  

  @action setEditorInfo = (width: number, height: number) => {
    this.editorInfo = {
      width: width,
      height: height
    }
  }
  
}

export const UIStore = new UIstore();