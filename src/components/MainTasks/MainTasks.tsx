import "./maintasks.css";
import { useEffect, useState } from "react";
import { dumpTasks, loadTasks } from "../../Tasks/tasksIo";
import Task from "../../Tasks/Task";
import TasksList from "../TasksList/TasksList";

function MainTasks() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks()
            .then((res) => setAllTasks(res))
            .catch(() => setAllTasks([]));
    }, []);

    async function handleAddPsuedoTask() {
        const nTask = new Task("AnotherSomthing!", "With description!");
        setAllTasks((prevAllTasks) => [...prevAllTasks, nTask]);
    }

    return (
        <div className="main-tasks">
            <h2>
                Time to get <span className="italic bold">things done!</span>
            </h2>
            <div className="no-margin-left">
                <TasksList tasks={allTasks} />
            </div>
            <button onClick={handleAddPsuedoTask}>Add task</button>
            <button onClick={() => console.log(allTasks)}>View tasks</button>
            <button onClick={() => dumpTasks(allTasks)}>Dump tasks</button>
        </div>
    );
}

export default MainTasks;
