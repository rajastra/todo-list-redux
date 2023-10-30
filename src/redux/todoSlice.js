import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  todos: [],
  status: 'idle',
  selectedTodo: null,
};

// Thunk functions
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (completed = '') => {
    const response = await axios.get(`${BASE_URL}?completed=${completed}`);
    return response.data;
  }
);

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const response = await axios.post(BASE_URL, { title: text });
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
  const response = await axios.put(`${BASE_URL}/${todo.id}`, {
    title: todo.title,
    completed: todo.completed,
  });
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoSelected(state, action) {
      const todo = action.payload;
      state.selectedTodo = todo;
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
        state.todos = state.todos.filter((todo) => todo.id !== todoId);
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
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { todoSelected } = todoSlice.actions;

export const selectAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;
export const getCompletedTodos = (state) =>
  state.todos.todos.filter((todo) => todo.completed);
export const getIncompleteTodos = (state) =>
  state.todos.todos.filter((todo) => !todo.completed);

export const selectTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo.id === todoId);

export const selectSelectedTodo = (state) => {
  return state.todos.selectedTodo;
};

export default todoSlice.reducer;
