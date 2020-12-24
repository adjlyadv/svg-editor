import React from 'react';
import '../style/ToolbarContainer.scss'
import circle from '../asset/circle.svg'
import pen from '../asset/pen.svg'
import mouse from '../asset/mouse.svg'
import line from '../asset/line.svg'
import rectangle from '../asset/rectangle.svg'
export default class ToolbarContainer extends React.Component {

    render() {
        return (
                <div className="Toolbar">
                    <div className="Toolitem" >
                        <img className="itmeicon" src={mouse}/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={circle}/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={rectangle}/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={line}/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={pen}/>
                    </div>

                </div>
        )
    }
}