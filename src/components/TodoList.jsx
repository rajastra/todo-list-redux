import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, getTodosStatus, selectAllTodos } from "../redux/todoSlice"
import TodoListItem from "./TodoListItem"

function TodoList() {
   const dispatch = useDispatch()
   const todos = useSelector(selectAllTodos)
   const todosStatus = useSelector(getTodosStatus)

   useEffect(() => {
      if (todosStatus === 'idle') {
         dispatch(fetchTodos())
      }
   }, [todosStatus, dispatch])

   return (
      <>
         {todosStatus === 'loading' && <div>Loading...</div>}
         {todosStatus === 'failed' && <div>Something went wrong...</div>}
         {todosStatus === 'succeeded' && (
            <ul className="list-none mt-5 rounded-md">
               {todos.map(todo => (
                  <TodoListItem key={todo.id} todo={todo} />
               ))}
            </ul>
         )}
      </>
   )
}

export default TodoList