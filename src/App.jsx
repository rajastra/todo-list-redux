import { useEffect, useState } from "react"
import bg from './assets/bg-desktop-light.jpg'
import AddTodo from "./components/AddTodo"
import EditTodo from "./components/EditTodo"
import TodoList from "./components/TodoList"
import { useDispatch } from "react-redux"
import { fetchTodos } from "./redux/todoSlice"

function App() {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')


  useEffect(() => {
    const status = filter === 'all' ? '' : filter === 'Active' ? false : true
    dispatch(fetchTodos(status))
  }
    , [dispatch, filter])


  return (
    <div className="h-screen">
      <div
        className="bg-cover h-[30vh] w-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
      </div>
      <div className="mt-[-200px] max-w-2xl mx-auto px-[2vw]">
        <h1 className="text-5xl text-white mb-8 uppercase tracking-[0.3em] font-semibold">Todo</h1>
        <AddTodo />
        <div className="btn-group flex gap-5 mt-5">
          <input type="radio" name="options" data-title="All" className="btn" checked={filter === 'all'} onChange={
            () => setFilter('all')
          } />
          <input type="radio" name="options" data-title="Active" className="btn" checked={filter === 'Active'}
            onChange={
              () => setFilter('Active')
            }
          />
          <input type="radio" name="options" data-title="Completed" className="btn" checked={filter === 'Completed'}
            onChange={
              () => setFilter('Completed')
            }
          />
        </div>
        <EditTodo />
        <TodoList />
      </div>
    </div>

  )
}

export default App
