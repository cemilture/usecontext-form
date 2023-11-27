import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const TasksContext = createContext();

function Provider({ children }) {
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  const [tasks, setTasks] = useState([]);
  const createTask = async (title, description) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title,
      description,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };
  const deleteTaskById = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => task.id !== id);
    // const afterDeletingTasks = tasks.filter((task) =>{ üstteki kod ile aynı işlevi görüyor
    //   return task.id!== id
    // })
    setTasks(afterDeletingTasks);
  };
  const editTaskById = (id, updatedTitle, updatedDescription) => {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      description: updatedDescription,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id,
          title: updatedTitle,
          description: updatedDescription,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const sharedValuesAndMethods = {
    tasks,
    createTask,
    deleteTaskById,
    editTaskById,
    fetchTasks,
  };
  return (
    <TasksContext.Provider value={sharedValuesAndMethods}>
      {children}
    </TasksContext.Provider>
  );
}

export { Provider };
export default TasksContext;
