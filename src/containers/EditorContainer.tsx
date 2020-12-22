import React from 'react';
import Path from '../elements/path';


export default class EditorContainer extends React.Component {
  
  render() {
    return(
      <svg width="500" height="500"> 
        <Path />
      </svg>
    )
  }
}