import "./taskslist.css";
import { useMemo } from "react";
import Task from "../Task/Task";
import { ITask, useTasks } from "../../Tasks/TasksContext";

interface ITasksListProps {
    parentTaskID?: string;
}

function TasksList(props: ITasksListProps) {
    const tasks = useTasks();
    const filteredTasks = useMemo(
        () =>
            props.parentTaskID
                ? tasks.filter(
                      (task) => task.parentTaskID === props.parentTaskID
                  )
                : tasks.filter((task) => !task.parentTaskID),
        [tasks]
    );

    return (
        <div className="tasklist">
            <ul>
                {filteredTasks.map((task: ITask, index: number) => {
                    return <Task task={task} key={index} />;
                })}
            </ul>
        </div>
    );
}

export default TasksList;
