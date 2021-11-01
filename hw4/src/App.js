import './App.css';
import React, {Component} from 'react';
import Myitem from './Item';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusSet : 0,
      tasklist : [], // 0 active 1 : complete
      inputfield : "",
    };
    this.nextid = 1;
  }
  get_focusSet = (id) => {
    if(id === this.state.focusSet) {
      return {outline: "solid"}
    }
    return {}
  }
  get_visible = (is_vis) => {
    if (is_vis === true) {
      return {}
    }
    return {visibility : "hidden"}
  }
  get_display = (is_display) => {
    if (is_display === true) {
      return {}
    }
    return {display : "none"}
  }
  dummy_set_focusSet = (id) => {
    return (() => {
      this.setState({focusSet : id});
    })
  }
  get_tri = (status) => {
    if(this.state.focusSet === 0 || this.state.focusSet === status + 1) {
      return status
    }
    return 2
  }
  some_completed = () => {
    return this.state.tasklist.some( (e) => e.status === 1 )
  }
  dummy_handle_from_item = (id, tp, state) => {
    if(tp === 1) {
      let arr = state.tasklist.slice()
      for(let i = 0; i < arr.length; i ++) {
        if(arr[i].id === id) {
          let ob = {...arr[i]}
          ob.status = 1 - ob.status
          arr[i] = ob
        }
      }
      return arr
    }
    else {
      let arr = state.tasklist.slice()
      arr = arr.filter(e => e.id !== id);
      return arr
    }
  }
  handle_item = (id, tp) => {
    this.setState(state => ({tasklist : this.dummy_handle_from_item(id, tp, state)}) )
  }
  dummy_add_a_item = (state, cont) => {
    let arr = state.tasklist.slice()
    arr.push({id : this.nextid, content : cont, status : 0})
    this.nextid += 1
    return arr
  }
  handle_input = (e) => {
    if (e.keyCode === 13 && this.state.inputfield !== "") {
      this.setState(state => ({tasklist : this.dummy_add_a_item(state, this.state.inputfield)}) )
      this.setState({inputfield: ""});
    }
  }
  updateinputvalue = (evt) => {
    this.setState({inputfield: evt.target.value});
  }
  lefts = () => {
    let cnt = 0
    this.state.tasklist.forEach((e) => {
      if(e.status === 0) {
        cnt += 1
      }
    })
    return cnt
  }
  clear_completed = () => {
    let arr = this.state.tasklist.slice()
    arr = arr.filter(e => e.status === 0);
    this.setState({tasklist : arr})
  }

  render(){
    return (
      <>
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <input className="todo-app__input" value={this.state.inputfield} placeholder="What needs to be done?" onChange={evt => this.updateinputvalue(evt)} onKeyUp={this.handle_input}/>
        <ul className="todo-app__list" id="todo-list" style={this.get_display(this.state.tasklist.length !== 0)}>
          {this.state.tasklist.map(e => 
            <Myitem id={e.id} content={e.content} display={this.get_tri(e.status)} cbf={this.handle_item}/>
          )}
        </ul>
      </section>
      <footer className="todo-app__footer" id="todo-footer" style={this.get_display(this.state.tasklist.length !== 0)}>
        <div className="todo-app__total">{this.lefts()} left</div>
        <ul className="todo-app__view-buttons">
          <button type="button" style={this.get_focusSet(0)} onClick={this.dummy_set_focusSet(0)}>All</button>
          <button type="button" style={this.get_focusSet(1)} onClick={this.dummy_set_focusSet(1)}>Active</button>
          <button type="button" style={this.get_focusSet(2)} onClick={this.dummy_set_focusSet(2)}>Completed</button>
        </ul>
        <div className="todo-app__clean" style={this.get_visible(this.some_completed())} >
          <button type="button" onClick={this.clear_completed}>Clear completed</button>
        </div>
      </footer>
      </>
    );
  }
}

export default App;
