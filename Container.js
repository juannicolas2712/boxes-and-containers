import React, {Component} from "react";
import "./Container.css";
import Box from "./Box";

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false, showDelete:false}
    
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClickBox = this.handleClickBox.bind(this);
    this.handleClickCon = this.handleClickCon.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.removeBox = this.removeBox.bind(this);
    this.handleRemoveContainer = this.handleRemoveContainer.bind(this);
  }

  handleMouseEnter(e){
    this.setState({hover: true, showDelete: true})
  }
  
  handleMouseLeave(e){
    this.setState({hover: false, showDelete: false})
  }

  handleClickBox(evt) {
    this.props.addBox(this.props.id);
  }
  
  handleClickCon(evt) {
    this.props.addContainer(this.props.id);
  }
  
  changeColor(color, id) {
    this.props.changeColor(color, id);
  }
  
  removeBox(id) {
    this.props.removeBox(id);
  }
  
  handleRemoveContainer(evt) {
    this.props.removeContainer(this.props.id);
  }
  
  render() {

    let display     = this.state.hover      ? 'Container-visible'     : 'Container-invisible'
    let deleteClass = this.state.showDelete ? 'Container-Delete-Show' : 'Container-Delete-Hide'

    const items = this.props.myObjects.items.map((item, index) => {
        if (item.type == 'container') {
            return <Container key={this.props.id+'-'+index} id={this.props.id+'-'+index} myObjects={item} addBox={this.props.addBox} addContainer={this.props.addContainer} changeColor={this.changeColor} removeBox={this.removeBox} removeContainer={this.props.removeContainer}/>
        } else if (item.type == 'box') {
            return <Box key={this.props.id+'-'+index} id={this.props.id+'-'+index} color={item.color ? item.color : 'orange'} changeColor={this.changeColor} removeBox={this.removeBox}/>
        }
    })
    
    return(
        <div className="Container">
            {items}
            <div className="Container-Button Container-Add" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                Add
                <div className={`Container-Delete ${deleteClass}`} title="Remove Container" onClick={this.handleRemoveContainer}>&#10006;</div>
                <div className={`Container-Button Container-Box ${display}`} onMouseEnter={this.handleMouseEnter} onClick={this.handleClickBox}>
                    Box
                </div>
                <div className={`Container-Button Container-Con ${display}`} onMouseEnter={this.handleMouseEnter} onClick={this.handleClickCon}>
                    Container            
                </div>
            </div>            
        </div>
    )
  }
}

export default Container;
