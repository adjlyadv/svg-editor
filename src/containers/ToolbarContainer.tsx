import React from 'react';
import '../style/ToolbarContainer.scss'
import circle from '../asset/circle.svg'
import pen from '../asset/pen.svg'
import mouse from '../asset/mouse.svg'
import line from '../asset/line.svg'
import rectangle from '../asset/rectangle.svg'
import circle_select from '../asset/circle_select.svg'
import pen_select from '../asset/pen_select.svg'
import mouse_select from '../asset/mouse_select.svg'
import line_select from '../asset/line_select.svg'
import rectangle_select from '../asset/rectangle_select.svg'
export default class ToolbarContainer extends React.Component<any,any> {

    handleClick(e:any){
        this.props.set(e.target.id)
    }

    render() {

        return (
                <div className="toolbar">
                    <div className="toolitem" onClick={this.handleClick.bind(this)} >
                        <img className="itmeIcon" id="mouse"  alt="" src={this.props.currentTool==="mouse"?mouse_select:mouse}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className="itmeIcon" id="circle" alt="" src={this.props.currentTool==="circle"?circle_select:circle}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className="itmeIcon" id="rectangle" alt="" src={this.props.currentTool==="rectangle"?rectangle_select:rectangle}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className="itmeIcon" id="line" alt="" src={this.props.currentTool==="line"?line_select:line}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className="itmeIcon" id="pen" alt="" src={this.props.currentTool==="pen"?pen_select:pen}/>
                    </div>

                </div>
        )
    }
}
