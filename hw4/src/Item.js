import './App.css';
import React, {Component} from 'react';


class myitem extends Component { // id content display : 0 active 1 : complete 2 : no display
  get_visible = () => {
    if(this.props.display === 2) {
      return {display : "none"}
    }
    return {}
  }
  get_style = () => {
    if(this.props.display === 0) {
      return {}
    }
    return {textDecoration: "line-through", opacity: 0.5}
  }
  render() {
    return (
      <li className="todo-app__item" style={this.get_visible()}>
        <div className="todo-app__checkbox">
          <input id={this.props.id} type="checkbox" onClick={() => {this.props.cbf(this.props.id, 1)}}  checked={this.props.display === 1}/>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1 className="todo-app__item-detail" style={this.get_style()}>
          {this.props.content}
        </h1>
        {/* eslint-disable-next-line */}
        <img className="todo-app__item-x" src="./img/x.png" onClick={() => {this.props.cbf(this.props.id, 2)}}/>
      </li>
    );
  }
}

export default myitem;
