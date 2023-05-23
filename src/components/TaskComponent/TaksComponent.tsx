import "./taskcomponent.css";
import { ChangeEvent, useState } from "react";
import Task from "../../Tasks/Task";
import TasksList from "../TasksList/TasksList";

interface ITaskComponentProps {
    task: Task;
}

function TaskComponent(props: ITaskComponentProps) {
    const { task } = props;
    const [subtasksExpanded, setSubtasksExpanded] = useState(false);

    function handleTaskCheckboxChange(e: ChangeEvent<HTMLInputElement>): void {
        console.log("Function not implemented.");
    }

    return (
        <>
            <li className="taskcomponent">
                <img
                    style={{
                        visibility:
                            !task.subtasks || task.subtasks?.length === 0
                                ? "hidden"
                                : "visible",
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
                    checked={task.done}
                    onChange={handleTaskCheckboxChange}
                    name="task_checkbox"
                    id={task.id}
                />
                <p>
                    {task.title}:{task.description}
                </p>
            </li>
            {subtasksExpanded && task.subtasks && (
                <TasksList tasks={task.subtasks} />
            )}
        </>
    );
}

export default TaskComponent;
