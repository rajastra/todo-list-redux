import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, getTodosStatus, selectAllTodos } from "./redux/todoSlice"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const todosStatus = useSelector(getTodosStatus)

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todosStatus, dispatch])

  console.log(todos)



  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
    </>
  )
}

export default App
