import React, { Fragment } from 'react';
import EditorContainer from './EditorContainer';
import StatusContainer from './StatusContainer';
import '../style/index.scss';

export default class BasicLayout extends React.Component {

  render() {
    return(
      <Fragment>
        <EditorContainer />
        <StatusContainer />
      </Fragment>
    )
  }

}