import { ITask, useTasks } from "../../Tasks/TasksContext";
import Task from "../Task/Task";
import "./taskslist.css";

export type TasksListProps = {
    tasks?: ITask[];
};

function TasksList({ tasks }: TasksListProps) {
    if (!tasks) {
        tasks = useTasks();
    }

    return (
        <div className="tasklist">
            {tasks.map((tempTask) => (
                <Task task={tempTask} key={tempTask.id} />
            ))}
        </div>
    );
}

export default TasksList;
