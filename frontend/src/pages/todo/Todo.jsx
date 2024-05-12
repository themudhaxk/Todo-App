import { useState, useEffect } from "react";
import {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useCompletedTodoMutation,
  useNotCompletedTodoMutation,
} from "../../redux/api/todoApiSlice";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { BsPencilSquare } from "react-icons/bs";

const Todo = () => {
  const { id: todoId } = useParams();
  const { data: todos, isLoading, refetch } = useGetAllTodosQuery();
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [completedTodo, { isLoading: isCompleted }] =
    useCompletedTodoMutation();
  const [notCompletedTodo, { isLoading: isNotCompleted }] =
    useNotCompletedTodoMutation();
  const [newTodo, setNewTodo] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 15) {
      // return res.json({ error: "Title cannot be more than 15 characters" });
      toast.error("Title cannot be more than 15 characters");
    }

    // Check the length of the text
    if (text.length > 50) {
      toast.error("Text cannot be more than 50 characters");
    }

    if (text.length < 10) {
      toast.error("Text must be more than 10 characters");
    }
    try {
      await addTodo({ title, text }).unwrap();
      setNewTodo("");
      setTitle("");
      setText("");
      refetch();
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
    refetch();
  };

  const handleTodoClick = (todoId) => {
    navigate(`/todo/${todoId}`);
  };

  // const handleToggleComplete = async () => {
  //   try {
  //     await completedTodo(todoId);
  //     toast.success("Todo completed!");
  //     refetch();
  //   } catch (error) {
  //     toast.error("Failed to mark. Please try again!");
  //     console.error(error);
  //   }
  // };

  const handleToggleComplete = async (todo) => {
    try {
      await completedTodo({ ...todo, completed: !todo.completed }).unwrap();
      toast.success("Todo mark as completed!");
      refetch();
    } catch (error) {
      toast.error("Failed to update. Please try again!");
      console.error(error);
    }
  };

  const handleUntoggleComplete = async (todo) => {
    try {
      await notCompletedTodo({ ...todo, completed: false }).unwrap();
      toast.success("Todo mark as not completed!");
      refetch();
    } catch (error) {
      toast.error("Failed to update. Please try again!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 pb-8 rounded shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between py-2 mt-[4rem] mb-[1rem]"
      >
         <div className="flex items-center 2xl:w-full lg:w-[70%] xl:w-[80%] md:w-[50%] sm:w-[40%] min-[0px]:w-[35%] ">
          <label className="text-black mr-3">Title:</label>
          <textarea
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new todo title"
            className="flex items-center justify-center p-2 pl-10 text-sm text-gray-700 border border-black rounded-lg"
          />
        </div>
        <div className="flex items-center 2xl:w-full lg:w-[70%] xl:w-[80%] md:w-[50%] sm:w-[40%] min-[0px]:w-[35%] ">
          <label className="text-black mr-3">Text:</label>
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new todo text"
            className="flex items-center justify-center p-2 pl-10 text-sm text-gray-700 border border-black rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded ml-4"
        >
          <RiAddLine />
        </button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="list-none m-0 p-0">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between py-2 border rounded-lg m-2 p-2 border-gray-200"
            >
              <div className="flex justify-center items-center py-2 border rounded-lg w-[20rem]">
                <span onClick={() => handleTodoClick(todo._id)} className="text-lg text-black cursor-pointer">{todo.title}</span>
              </div>
              <div className="flex justify-center items-center py-2 border rounded-lg w-[30rem]">
                <span className="text-lg text-black cursor-pointer" onClick={() => handleTodoClick(todo._id)}>
                  {todo.text.length > 30
                    ? `${todo.text.substring(0, 30)}...`
                    : todo.text}
                </span>
              </div>

              <div className="flex items-center">
                {!todo.completed && (
                  <button
                    disabled={isUpdating}
                    onClick={() => handleToggleComplete(todo)}
                    className="mr-2"
                  >
                    {todo.completed ? (
                      <RiCheckboxLine size={20} className="text-green-500" />
                    ) : (
                      <RiCheckboxBlankLine
                        size={20}
                        className="text-gray-500 hover:text-grey-800"
                      />
                    )}
                  </button>
                )}
                {todo.completed && (
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUntoggleComplete(todo)}
                    className="mr-2"
                  >
                    {!todo.completed ? (
                      <RiCheckboxBlankLine
                        size={20}
                        className="text-gray-500"
                      />
                    ) : (
                      <RiCheckboxLine
                        size={20}
                        className="text-green-500 hover:text-green-800"
                      />
                    )}
                  </button>
                )}
                <button onClick={() => handleTodoClick(todo._id)}>
                  <BsPencilSquare
                    size={20}
                    className="text-blue-500 hover:text-blue-800 mr-2"
                  />
                </button>

                <button
                  disabled={isDeleting}
                  onClick={() => handleDelete(todo._id)}
                >
                  <RiDeleteBinLine
                    size={20}
                    className="text-red-500 hover:text-red-800"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
