import { useDispatch, useSelector } from "react-redux"
import { selectSelectedTodo, updateTodo } from "../redux/todoSlice"
import { useEffect, useState } from "react"

function EditTodo() {
   const todo = useSelector(selectSelectedTodo)
   const dispatch = useDispatch()
   const [form, setForm] = useState({
      status: '',
      title: ''
   })

   const handleStatusChange = (event) => {
      setForm({
         ...form,
         status: event.target.value
      })
   }

   const handleTitleChange = (event) => {
      setForm({
         ...form,
         title: event.target.value
      })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const payload = {
         id: todo?.id,
         title: form?.title,
         completed: form?.status === 'completed' ? true : false
      }
      dispatch(updateTodo(
         payload
      ))
      document.getElementById('my_modal_1').close()
      setForm({
         status: '',
         title: ''
      })
   }

   useEffect(() => {
      if (todo) {
         setForm({
            status: todo?.completed ? 'completed' : 'not-completed',
            title: todo?.title
         })
      }
   }, [todo])

   return (
      <div>
         <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Edit Todo</h3>
               <form action="#">
                  <div className="form-control w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Title</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        value={form?.title}
                        onChange={handleTitleChange}
                     />
                  </div>
                  <div className="form-control w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Status</span>
                     </label>
                     <div className="flex items-center space-x-2">
                        <label>
                           <input
                              type="radio"
                              name="status"
                              value="not-completed"
                              checked={form?.status === "not-completed"}
                              onChange={handleStatusChange}
                           />
                           <span className="ml-2">Active</span>
                        </label>
                        <label>
                           <input
                              type="radio"
                              name="status"
                              value='completed'
                              checked={form?.status === "completed"}
                              onChange={handleStatusChange}
                           />
                           <span className="ml-2">Completed</span>
                        </label>
                     </div>
                  </div>
               </form>
               <div className="modal-action">
                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn">Close</button>
                  </form>
                  <button onClick={handleSubmit} className="btn bg-blue-500 text-white hover:bg-blue-600 transition-colors ease-in-out border-none">Simpan</button>
               </div>
            </div>
         </dialog>
      </div>
   )
}

export default EditTodo