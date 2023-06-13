import { useTasks, useTasksDispatch } from "../../Tasks/TasksContext";
import "./addtask.css";

function AddTask() {
    const allTasks = useTasks();
    const dispatchTasks = useTasksDispatch();

    function handleAddTask(event: any) {
        event.preventDefault();
        const title_input = event.target.task_title;
        dispatchTasks({
            type: "add",
            title: title_input.value,
            parentTask: allTasks[0],
        });
        title_input.value = "";
    }

    return (
        <form className="addtask" onSubmit={handleAddTask}>
            <input
                onInput={(e: any) => e.target.setCustomValidity("")}
                onInvalid={(e: any) =>
                    e.target.setCustomValidity("Don't show off your laziness!")
                }
                required
                name="task_title"
                type="text"
                className="addtask__input"
                placeholder="A thing to complete!"
            />
            <label>
                <input type="submit" style={{ display: "none" }} />
                <img
                    draggable="false"
                    className="addtask__img"
                    alt="add task"
                    src="/assets/add_task.svg"
                />
            </label>
        </form>
    );
}

export default AddTask;
