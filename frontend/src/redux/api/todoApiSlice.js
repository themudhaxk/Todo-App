import { apiSlice } from "./apiSlice";
import { TODO_URL } from "../constants";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => `${TODO_URL}/todos`,
    }),

    getTodo: builder.query({
        query: (id) => `${TODO_URL}/${id}`,
      }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: `${TODO_URL}`,
        method: "POST",
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ todo, todoId }) => ({
        url: `${TODO_URL}/${todoId}`,
        method: "PUT",
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `${TODO_URL}/${todoId}`,
        method: "DELETE",
      }),
    }),
    completedTodo: builder.mutation({
      query: (todo) => ({
        url: `${TODO_URL}/${todo._id}/completed`,
        method: "PUT",
        body: todo,
      }),
    }),
    notCompletedTodo: builder.mutation({
      query: (todo) => ({
        url: `${TODO_URL}/${todo._id}/not-completed`,
        method: "PUT",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompletedTodoMutation,
  useNotCompletedTodoMutation
} = todoApiSlice;
