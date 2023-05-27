import "./maintasks.css";
import { dumpTasks } from "../../Tasks/tasksIo";
import TasksList from "../TasksList/TasksList";
import { useTasks } from "../../Tasks/TasksContext";
import { useTasksDispatch } from "../../Tasks/TasksContext";
import { useRef, MouseEvent } from "react";

function MainTasks() {
    const allTasks = useTasks();
    const dispatchTasks = useTasksDispatch();
    const taskInputRef = useRef("");

    function handleAddTask(event: any) {
        event.preventDefault();
        console.log(event.target.task_title.value);
    }

    return (
        <div className="main-tasks">
            <h2>
                Time to get <span className="italic bold">things done!</span>
            </h2>
            <form className="addtask" onSubmit={handleAddTask}>
                <input
                    name="task_title"
                    type="text"
                    className="addtask__input"
                    placeholder="A thing to complete!"
                />
                <label>
                    <input type="submit" />
                    <img
                        draggable="false"
                        className="addtask__img"
                        alt="add task"
                        src="/assets/add_task.svg"
                    />
                </label>
            </form>
            <div className="no-margin-left">
                <TasksList />
            </div>
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
