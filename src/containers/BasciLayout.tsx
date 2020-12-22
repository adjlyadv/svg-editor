import React, { Fragment } from 'react';
import EditorContainer from './EditorContainer'
import '../style/index.less';

export default class BasicLayout extends React.Component {

  render() {
    return(
      <Fragment>
        <EditorContainer />
        
      </Fragment>
    )
  }

}