import "./taskslist.css";
import { useMemo } from "react";
import TaskComponent from "../TaskComponent/TaksComponent";
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
                    return <TaskComponent task={task} key={index} />;
                })}
            </ul>
        </div>
    );
}

export default TasksList;
