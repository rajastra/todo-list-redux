import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, getTodosStatus, selectAllTodos } from "./redux/todoSlice"
import { useEffect } from "react"
import bg from './assets/bg-desktop-light.jpg'

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const todosStatus = useSelector(getTodosStatus)

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todosStatus, dispatch])

  return (
    <div className="h-screen">
      <div
        className="bg-cover h-[30vh] w-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
      </div>
      <div className="mt-[-100px] max-w-2xl mx-auto px-[2vw]">
        <h1 className="text-4xl text-white mb-8 uppercase tracking-[0.3em] font-semibold">Todo</h1>
        {todosStatus === 'loading' && <div>Loading...</div>}
        {todosStatus === 'failed' && <div>Something went wrong...</div>}
        {todosStatus === 'succeeded' && (
          <ul className="list-none">
            {todos.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>

  )
}

export default App
