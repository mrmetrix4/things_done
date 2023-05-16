import { useEffect, useState } from "react";
import { dumpTasks, loadTasks } from "./tasksIo";
import Task from "./Task";
import { event } from "@tauri-apps/api";

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        loadTasks()
            .then((res) => setTasks(res))
            .catch(() => setTasks([]));
    }, []);

    async function handleAddPsuedoTask() {
        const nTask = new Task("AnotherSomthing!", "With description!");
        setTasks((prevTasks) => [...prevTasks, nTask]);
    }

    async function handleOnChange(e: any) {
        const { checked, id } = e.target;
        console.log(id);
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id == id ? { ...t, done: checked } : t))
        );
    }

    return (
        <div>
            {tasks.map((t, index) => (
                <p key={index}>
                    <input
                        type="checkbox"
                        checked={t.done}
                        onChange={handleOnChange}
                        name="task_checkbox"
                        id={t.id}
                    />
                    {t.title}:{t.description}
                </p>
            ))}
            <button onClick={handleAddPsuedoTask}>Add task</button>
            <button onClick={() => console.log(tasks)}>View tasks</button>
            <button onClick={() => dumpTasks(tasks)}>Dump tasks</button>
        </div>
    );
}

export default TaskList;
