import "./taskcomponent.css";
import { ChangeEvent, useMemo, useState } from "react";
import TasksList from "../TasksList/TasksList";
import { ITask, useTasks } from "../../Tasks/TasksContext";

interface ITaskComponentProps {
    task: ITask;
}

function TaskComponent(props: ITaskComponentProps) {
    const { task } = props;
    const tasks = useTasks();
    const [subtasksExpanded, setSubtasksExpanded] = useState(false);

    const subtasks = useMemo(
        () => tasks.filter((t) => t.parentTaskID === task.id),
        [tasks]
    );

    function handleTaskCheckboxChange(e: ChangeEvent<HTMLInputElement>): void {
        console.log("Function not implemented.");
    }

    return (
        <>
            <li className="taskcomponent">
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
            </li>
            {subtasksExpanded && <TasksList parentTaskID={task.id} />}
        </>
    );
}

export default TaskComponent;
