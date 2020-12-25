import React from 'react';
import '../style/ToolbarContainer.scss'
import circle from '../asset/circle.svg'
import pen from '../asset/pen.svg'
import mouse from '../asset/mouse.svg'
import line from '../asset/line.svg'
import rectangle from '../asset/rectangle.svg'

export default class ToolbarContainer extends React.Component<any,any> {

    handleClick(e:any){
        this.props.set(e.target.id)
    }

    render() {

        return (
                <div className="toolbar">
                    <div className="toolitem" onClick={this.handleClick.bind(this)} >
                        <img className={this.props.currentTool==="mouse"?"itmeIconselect":"itmeIcon"} id="mouse"  alt="" src={mouse}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className={this.props.currentTool==="circle"?"itmeIconselect":"itmeIcon"} id="circle" alt="" src={circle}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className={this.props.currentTool==="rectangle"?"itmeIconselect":"itmeIcon"} id="rectangle" alt="" src={rectangle}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className={this.props.currentTool==="line"?"itmeIconselect":"itmeIcon"} id="line" alt="" src={line}/>
                    </div>
                    <div className="toolitem" onClick={this.handleClick.bind(this)}>
                        <img className={this.props.currentTool==="pen"?"itmeIconselect":"itmeIcon"} id="pen" alt="" src={pen}/>
                    </div>

                </div>
        )
    }
}
