import React, { Component } from 'react'
import TodoStore from '../stores/TodoStore'
import Todo from './Todo'
import TodoActions from '../actions/TodoActions'

class TodoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      todoList: []
    }

    TodoStore.on('change', () => {
      this.getAllTodos()
    })
  }

  componentWillMount () {
    this.getAllTodos()
  }

  getAllTodos () {
    let todos = TodoStore.getAll()
    this.setState({todos})
  }

  handleChange (event) {
    // console.log(event.target.value)

    this.setState({title: event.target.value})
  }

  createTodo (event) {
    event.preventDefault()
    TodoActions.createTodo(this.state.title)
  }

  render () {
    const {todos} = this.state
    // console.log(todos)

    const todoElements = todos.map((todo) => (
      <Todo key={todo.id} {...todo} />
    ))

    return (
      <div>
        <ul>{todoElements}</ul>
        <input
          type='text'
          ref='title'
          value={this.state.title}
          onChange={this.handleChange.bind(this)} />
        <button onClick={this.createTodo.bind(this)}>Add</button>
      </div>
    )
  }
}

export default TodoList
