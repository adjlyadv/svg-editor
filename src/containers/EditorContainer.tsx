import React from 'react';
import { observer } from 'mobx-react';
import { UIStore } from '../stores/UIStore';
import Path from '../elements/path';

@observer
export default class EditorContainer extends React.Component {

  handleEditorClick = (event: any) => {
    console.log(event)
  }

  render() {

    const editorInfo = UIStore.editorInfo;

    return(
      <svg onClick={this.handleEditorClick} width={editorInfo.width} height={editorInfo.height}> 
        <Path />
      </svg>
    )
  }
}