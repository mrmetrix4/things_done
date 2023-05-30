import "./task.css";
import { ChangeEvent, useState } from "react";
import TasksList from "../TasksList/TasksList";
import { ITask, useTasks, useTasksDispatch } from "../../Tasks/TasksContext";

function Task(props: { task: ITask }) {
    const { task } = props;
    const tasks = useTasks();
    const dispatchTasks = useTasksDispatch();
    const [subtasksExpanded, setSubtasksExpanded] = useState(false);
    const subtasks = tasks.filter((t) => t.parentTaskID === task.id);

    function handleTaskCheckboxChange(e: ChangeEvent<HTMLInputElement>): void {
        if (task.doneTime) {
            task.doneTime = undefined;
        } else {
            task.doneTime = new Date();
        }
        dispatchTasks({ type: "edit", task: task });
    }

    return (
        <>
            <li className="task">
                <div className="left-side">
                    <img
                        style={{
                            visibility:
                                subtasks.length === 0 ? "hidden" : "visible",
                        }}
                        className="expand-arrow"
                        alt="expand subtasks"
                        src="/assets/arrow.svg"
                        aria-expanded={subtasksExpanded}
                        onClick={() => {
                            setSubtasksExpanded((prevState) => !prevState);
                        }}
                    />
                    <input
                        type="checkbox"
                        checked={task.doneTime !== undefined}
                        onChange={handleTaskCheckboxChange}
                        id={task.id}
                    />
                    <p>
                        {task.title}:{task.description}
                    </p>
                </div>
                <div className="right-side">
                    <img
                        className="remove-task-button"
                        alt="remove task"
                        src="/assets/window_close.svg"
                        onClick={() =>
                            dispatchTasks({ type: "remove", task: task })
                        }
                    />
                </div>
            </li>
            {subtasksExpanded && <TasksList parentTaskID={task.id} />}
        </>
    );
}

export default Task;
