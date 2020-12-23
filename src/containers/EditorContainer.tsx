import React from 'react';
import Path from '../elements/path';


export default class EditorContainer extends React.Component {
  

  handleEditorClick = (event: any) => {
    console.log(event)
  }

  render() {
    return(
      <svg onClick={this.handleEditorClick} width="500" height="500"> 
        <Path />
      </svg>
    )
  }
}