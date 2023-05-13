import { useEffect, useState } from "react";
import { dumpTasks, loadTasks } from "./tasksIo";
import Task from "./Task";

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks().then((res) => setTasks(res));
    }, []);

    async function handleAddPsuedoTask() {
        const nTask = new Task("AnotherSomthing!", "With description!");
        setTasks((prevTasks) => [...prevTasks, nTask]);
    }

    return (
        <div>
            <p>{tasks.map((t) => t.title)}</p>
            <button onClick={handleAddPsuedoTask}>Add task</button>
            <button onClick={() => console.log(tasks)}>View tasks</button>
            <button onClick={() => dumpTasks(tasks)}>Dump tasks</button>
        </div>
    );
}

export default TaskList;
