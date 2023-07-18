import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {list: [], taskInput: '', category: tagsList[0].displayText}

  onInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  optionSelect = event => {
    this.setState({category: event.target.value})
  }

  addingTask = () => {
    const {taskInput, category} = this.state
    const item = {
      id: v4(),
      category,
      taskInput,
    }
    console.log(tagsList[0].displayText)
    this.setState(prev => ({
      list: [...prev.list, item],
    }))
    this.setState({
      category: tagsList[0].displayText,
      taskInput: '',
    })
  }

  onFilter = event => {
    const {id} = event.target
    console.log(id.toLowerCase())
    const {list} = this.state
    const filteredList = list.filter(
      i => i.category.toLowerCase() === id.toLowerCase(),
    )
    console.log(list)
    this.setState({list: filteredList})
  }

  render() {
    const {taskInput, list} = this.state
    const zeroList = list.length === 0
    return (
      <div>
        <form>
          <h1>Create a task!</h1>
          <div>
            <label htmlFor="task">Task</label>
            <input
              value={taskInput}
              onChange={this.onInputChange}
              id="task"
              type="text"
              placeholder="Enter the task here"
            />
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <select onChange={this.optionSelect} id="tags">
              {tagsList.map(i => (
                <option value={i.optionId} key={i.optionId}>
                  {i.displayText}
                </option>
              ))}
            </select>
          </div>
          <button onClick={this.addingTask} type="button">
            Add Task
          </button>
        </form>
        {/*                                   */}
        <div>
          <div>
            <h1>Tags</h1>
            <ul>
              {tagsList.map(i => (
                <li key={i.optionId}>
                  <div>
                    <button
                      id={i.optionId}
                      onClick={this.onFilter}
                      type="button"
                    >
                      {i.displayText}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h1>Tasks</h1>
          {zeroList ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul>
              {list.map(i => (
                <li key={i.id}>
                  <div>
                    <p>{i.taskInput}</p>
                    <p>{i.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
