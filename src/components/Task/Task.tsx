import { ChangeEvent, useState } from "react";
import { ITask, useTasks, useTasksDispatch } from "../../Tasks/TasksContext";
import DndTasksList from "../DndTasksList/DndTasksList";
import "./task.css";

function Task(props: { task: ITask }) {
    const { task } = props;
    const dispatchTasks = useTasksDispatch();
    const [subtasksExpanded, setSubtasksExpanded] = useState(false);
    const subtasks = task.subtasks;

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
                                subtasks && subtasks.length > 0
                                    ? "visible"
                                    : "hidden",
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
            {subtasksExpanded && <DndTasksList tasks={task.subtasks} />}
        </>
    );
}

export default Task;
