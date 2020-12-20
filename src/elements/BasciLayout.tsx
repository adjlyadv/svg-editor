import React from 'react';
import Path from './path';
import Node from './node';

export default class BasicLayout extends React.Component {


  render() {
    return(
      <svg width="500" height="500"> 
        <Path />
      </svg>
    )
  }

}