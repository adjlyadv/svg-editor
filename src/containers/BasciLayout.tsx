import React, { Fragment } from 'react';
import EditorContainer from './EditorContainer';
import '../style/index.scss';
import ToolbarContainer from "./ToolbarContainer";

export default class BasicLayout extends React.Component {

  render() {
    return(
      <Fragment>
        <ToolbarContainer />
        <EditorContainer />
        
      </Fragment>
    )
  }

}