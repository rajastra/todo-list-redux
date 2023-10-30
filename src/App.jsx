import bg from './assets/bg-desktop-light.jpg'
import AddTodo from "./components/AddTodo"
import EditTodo from "./components/EditTodo"
import TodoList from "./components/TodoList"

function App() {

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
        <EditTodo />
        <TodoList />
      </div>
    </div>

  )
}

export default App
