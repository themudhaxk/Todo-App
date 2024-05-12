import Spinner from "../../components/Spinner";
import { useGetTodoQuery } from "../../redux/api/todoApiSlice";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useCompletedTodoMutation,
  useNotCompletedTodoMutation,
} from "../../redux/api/todoApiSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { MdOutlineSystemUpdateAlt } from "react-icons/md";

const TodoDetails = () => {
  const { id: todoId } = useParams();
  const { data: todo, isLoading, refetch } = useGetTodoQuery(todoId);
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [completedTodo] =
    useCompletedTodoMutation();
  const [notCompletedTodo] =
    useNotCompletedTodoMutation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && todo) {
      setTitle(todo.title);
      setText(todo.text);
    }
  }, [todo, isLoading]);

  const handleDelete = async () => {
    await deleteTodo(todoId);
    navigate("/todos")
  };

  const handleToggleComplete = async () => {
    try {
      await completedTodo({ _id: todoId, completed: !todo.completed }).unwrap();
      toast.success("Todo marked as completed!");
      
    } catch (error) {
      toast.error("Failed to update. Please try again!");
      console.error(error);
    }
  };

  const handleUntoggleComplete = async () => {
    try {
      await notCompletedTodo({ _id: todoId, completed: false }).unwrap();
      toast.success("Todo marked as not completed!");
    } catch (error) {
      toast.error("Failed to update. Please try again!");
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (title.length > 15) {
      toast.error("Title cannot be more than 15 characters")
    }

    // Check the length of the text
    if (text.length > 50) {
      toast.error("Text cannot be more than 50 characters");
    }

    if (text.length < 10) {
      toast.error("Text must be more than 10 characters");
    }
  
    try {
      const updatedTodo = {
        title,
        text
      };
  
      await updateTodo({ todo: updatedTodo, todoId }).unwrap();
      toast.success("Todo updated successfully!");
      navigate("/todos")
      window.location.reload();
      refetch();
    } catch (error) {
      toast.error(error.message || error);
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center container mx-auto p-4 pt-6 pb-8 rounded">
      <div className="flex flex-col justify-center items-center rounded-lg w-[80%] h-[40rem] border border-black">
        <div className="flex justify-center items-center rounded-lg mt-[-10px] w-[70%] h-[10%] border border-black m-6">
          <textarea
            className="form-input p-4 w-[100%] h-[100%] bg-inherit"
            id="title"
            placeholder="Enter Title..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center rounded-lg w-[85%] h-[70%] border border-black">
          <textarea
            className="form-input p-4 rounded-sm w-[100%] h-[100%] bg-inherit decoration-transparent"
            id="text"
            placeholder="Enter Text..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        </div>

        <div className="flex flex-row justify-between items-center m-4">
          {!todo.completed && (
            <button
              disabled={isUpdating}
              onClick={handleToggleComplete}
              className="flex flex-col justify-center items-center mr-[10rem]"
            >
              {todo.completed ? (
                <RiCheckboxLine size={20} className="text-green-500" />
              ) : (
                <span className="flex flex-col justify-center items-center"> 
                <RiCheckboxBlankLine size={20} className="text-gray-500" />
                Not Completed
                </span>
              )}
            </button>
          )}
          {todo.completed && (
            <button
              disabled={isUpdating}
              onClick={handleUntoggleComplete}
              className="flex flex-col justify-center items-center mr-[10rem]"
            >
              {!todo.completed ? (
                <span>
                <RiCheckboxBlankLine size={20} className="text-gray-500" />
                Not Completed
                </span>
              ) : (
                <span className="flex flex-col justify-center items-center">
                  <RiCheckboxLine
                  size={20}
                  className="text-green-500 hover:text-green-800"
                /> Completed
                </span>
                
              )}
            </button>
          )}

          <button onClick={handleUpdate} className="flex flex-col justify-center items-center mr-[10rem]">
          <MdOutlineSystemUpdateAlt
              size={20}
              className="text-blue-500 hover:text-blue-800"
            />Update
          </button>

          <button disabled={isDeleting} onClick={handleDelete} className="flex flex-col justify-center items-center">
            <RiDeleteBinLine
              size={20}
              className="text-red-500 hover:text-red-800"
            />Delete
          </button>
        
      </div>
    </div>
  );
};

export default TodoDetails;
