import "./maintasks.css";
import { dumpTasks } from "../../Tasks/tasksIo";
import TasksList from "../TasksList/TasksList";
import { useTasks } from "../../Tasks/TasksContext";
import { useTasksDispatch } from "../../Tasks/TasksContext";
import { useRef, MouseEvent, useEffect } from "react";

function MainTasks() {
    const allTasks = useTasks();
    const dispatchTasks = useTasksDispatch();

    function handleAddTask(event: any) {
        event.preventDefault();
        const title_input = event.target.task_title;
        dispatchTasks({ type: "add", title: title_input.value });
        title_input.value = "";
    }

    return (
        <div className="main-tasks">
            <h2>
                Time to get <span className="italic bold">things done!</span>
            </h2>
            <form className="addtask" onSubmit={handleAddTask}>
                <input
                    onInput={(e: any) => e.target.setCustomValidity("")}
                    onInvalid={(e: any) =>
                        e.target.setCustomValidity(
                            "Don't show off your laziness!"
                        )
                    }
                    required
                    name="task_title"
                    type="text"
                    className="addtask__input"
                    placeholder="A thing to complete!"
                />
                <label>
                    <input type="submit" style={{ display: "none" }} />
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
