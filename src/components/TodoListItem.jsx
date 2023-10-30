import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { deleteTodo, todoSelected, updateTodo } from "../redux/todoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';


function TodoListItem({ todo }) {
   const dispatch = useDispatch()

   const handleToggle = () => {
      dispatch(updateTodo({
         ...todo,
         completed: !todo.completed
      })
      )
   }

   const handleDelete = () => {
      dispatch(deleteTodo(
         todo.id
      ))
   }

   const handleEdit = () => {
      document.getElementById('my_modal_1').showModal()
      dispatch(todoSelected(todo))

   }


   return (
      <li className="flex items-center bg-white px-4 py-4 border border-b-2-gray-500 gap-5 text-lg">
         <input type="checkbox"
            className="appearance-none bg-white border border-gray-400 checked:bg-blue-500 checked:border-transparent checked:outline-none h-6 rounded-full w-6 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            onChange={handleToggle}
            defaultChecked={todo.completed}
         />
         <p
            className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
         >
            {todo.title}
         </p>
         <button
            type="button"
            className="text-gray-400 hover:text-blue-700"
            onClick={handleEdit}
         >
            <FontAwesomeIcon icon={faEdit} />
         </button>
         <button
            type="button"
            className="text-gray-400 hover:text-red-700"
            onClick={handleDelete}
         >
            <FontAwesomeIcon icon={faTrashAlt} />
         </button>
      </li>
   )
}

TodoListItem.propTypes = {
   todo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
   }).isRequired,
};
export default TodoListItem