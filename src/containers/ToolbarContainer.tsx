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
                        <img className="itmeicon" src={mouse} alt="mouse"/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={circle} alt="circle"/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={rectangle} alt="rectangle"/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={line} alt="line"/>
                    </div>
                    <div className="Toolitem">
                        <img className="itmeicon" src={pen} alt="pen"/>
                    </div>

                </div>
        )
    }
}