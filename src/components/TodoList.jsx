import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, getTodosStatus, selectAllTodos } from "../redux/todoSlice"
import TodoListItem from "./TodoListItem"
import LaodingSpinner from "./LaodingSpinner"

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
      <div className={`min-h-[30vh] mt-5 bg-white ${todos.length === 0 || todosStatus === 'loading' ? 'border border-2-gray-500 grid place-items-center' : ''}`} >
         {todosStatus === 'loading' && <LaodingSpinner />}
         {todosStatus === 'failed' && <div>Something went wrong...</div>}
         {todosStatus === 'succeeded' && (
            <ul className={`list-none bg-white `} >
               {todos.map(todo => (
                  <TodoListItem key={todo.id} todo={todo} />
               ))}
               {
                  todos.length === 0 && <div className="text-gray-400">No todos found...</div>
               }
            </ul>
         )}
      </div>
   )
}

export default TodoList