import { useTasks, useTasksDispatch } from "../../Tasks/TasksContext";
import { dumpTasks } from "../../Tasks/tasksIo";
import AddTask from "../AddTask/AddTask";
import TasksList from "../TasksList/TasksList";
import "./maintasks.css";

function MainTasks() {
    const allTasks = useTasks();
    const dispatchTasks = useTasksDispatch();

    return (
        <div className="main-tasks">
            <h2>
                Time to get <span className="italic bold">things done!</span>
            </h2>
            <AddTask></AddTask>
            <div className="no-margin-left">{<TasksList />}</div>
            <button
                onClick={() =>
                    dispatchTasks({ type: "add", title: "Psuedo task" })
                }
            >
                Add task
            </button>
            <button onClick={() => console.log(allTasks)}>View tasks</button>
            <button onClick={() => dumpTasks(allTasks)}>Dump tasks</button>
        </div>
    );
}

export default MainTasks;
