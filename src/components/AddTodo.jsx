import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodosStatus, saveNewTodo } from "../redux/todoSlice"

function AddTodo() {
   const dispatch = useDispatch()
   const [text, setText] = useState('')
   const todosStatus = useSelector(getTodosStatus)

   const handleSubmit = () => {
      try {
         if (text.trim()) {
            dispatch(saveNewTodo(text))
            setText('')
         }
      } catch (error) {
         console.log(error)
      }
   }

   const btnStyles = {
      base: 'focus:outline-none rounded-md px-4 py-2 sm:w-1/4',
      disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed border-none'
   }


   return (
      <div className="flex sm:flex-row flex-col gap-3">
         <input type="text" className="rounded-md sm:w-3/4 px-4 py-2 transition-all ease-in-out
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
         "
            placeholder="Create a new todo..."
            value={text}
            onChange={e => setText(e.target.value)}
         />
         <button className={
            `${btnStyles.base} ${text === '' || todosStatus === 'loading' ? btnStyles.disabled : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors ease-in-out border-none'}`
         }
            onClick={
               handleSubmit
            }
            disabled={todosStatus === 'loading' || text === ''}
         >{todosStatus === 'loading' ? 'Loading...' : 'Add Todo'}</button>
      </div>
   )
}

export default AddTodo