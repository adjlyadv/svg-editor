import React from 'react';
import { UIStore } from '../stores/UIStore';
import Path from '../elements/path';
import '../style/EditorContainer.scss';

interface State{
  
}

interface Poprs{

}

export default class EditorContainer extends React.Component<Poprs, State> {
  edtiorRef: React.RefObject<SVGSVGElement>;

  constructor(props: Poprs) {
    super(props);
    this.edtiorRef = React.createRef();
  }

  componentDidMount() {
    const editorInfo = this.edtiorRef.current?.getBoundingClientRect();
    if (editorInfo) {
      UIStore.editorInfo.top = editorInfo.top;
      UIStore.editorInfo.left = editorInfo.left;
    }
  }

  render() {

    const editorInfo = UIStore.editorInfo;
    const pathList = UIStore.pathList;

    return(
      <div className="editor-container">
        <svg ref={this.edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}> 
          {pathList.map(path => (
            <Path path={path} />
          ))}
        </svg>
      </div>
    )
  }
}