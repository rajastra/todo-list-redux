import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  todos: [],
  status: 'idle',
};

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const initialTodo = { text };
    const response = await axios.post(BASE_URL, { initialTodo });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId) => {
    await axios.delete(`${BASE_URL}/${todoId}`);
    return todoId;
  }
);

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`${BASE_URL}/${todo.id}`, { todo });
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload;
      state.todos[todo.id] = todo;
    },
    todoToggled(state, action) {
      const todoId = action.payload;
      const todo = state.todos[todoId];
      todo.completed = !todo.completed;
    },
    todoEdited(state, action) {
      const { id, title } = action.payload;
      const todo = state.todos[id];
      todo.title = title;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveNewTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(saveNewTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const todoId = action.payload;
        delete state.todos[todoId];
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTodo = action.payload;
        state.todos[updatedTodo.id] = updatedTodo;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { todoAdded, todoToggled } = todoSlice.actions;

export const selectAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;
export const getCompletedTodos = (state) =>
  state.todos.todos.filter((todo) => todo.completed);
export const getIncompleteTodos = (state) =>
  state.todos.todos.filter((todo) => !todo.completed);

export default todoSlice.reducer;
