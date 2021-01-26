import React, { useEffect, useRef } from 'react';
import { UIStore } from '../stores/UIStore';
import Path from '../elements/path';
import '../style/EditorContainer.scss';

const EditorContainer: React.FC<{}> = () =>  {

  useEffect(() => {
    if (!edtiorRef) {
      return
    }

    const editorInfo = edtiorRef?.current?.getBoundingClientRect();

    if (editorInfo) {
      UIStore.editorInfo.top = editorInfo.top;
      UIStore.editorInfo.left = editorInfo.left;
    }
  }, [])

  const edtiorRef = useRef<SVGSVGElement>(null);

  
  const editorInfo = UIStore.editorInfo;
  const pathList = UIStore.pathList;

  return(
    <div className="editor-container">
      <svg ref={edtiorRef} className="editor-svg" width={editorInfo.width} height={editorInfo.height}> 
        {pathList.map(path => (
          <Path path={path} />
        ))}
      </svg>
    </div>
  )

}

export default EditorContainer;