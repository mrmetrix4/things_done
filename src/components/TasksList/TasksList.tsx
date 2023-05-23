import "./taskslist.css";
import { useEffect, useState } from "react";
import Task from "../../Tasks/Task";
import TaskComponent from "../TaskComponent/TaksComponent";

interface ITasksListProps {
    tasks: Task[];
}

function TasksList(props: ITasksListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => setTasks(props.tasks), []);

    async function handleOnChange(e: any) {
        const { checked, id } = e.target;
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id == id ? { ...t, done: checked } : t))
        );
    }

    return (
        <div className="tasklist">
            <ul>
                {tasks.map((task: Task, index: number) => {
                    return <TaskComponent task={task} key={index} />;
                })}
            </ul>
        </div>
    );
}

export default TasksList;
