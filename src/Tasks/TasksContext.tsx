import { arch } from "os";
import { title } from "process";
import {
    Dispatch,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { loadTasks } from "./tasksIo";

export interface ITask {
    id: string;
    title: string;
    description?: string;
    subtasks?: ITask[];
    doneTime?: Date;
}

const TasksContext = createContext<ITask[]>([]);
const TasksDispatchContext = createContext<Dispatch<DispatchTaskAction> | null>(
    null
);

export function TasksProvider({ children }: any) {
    const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

    useEffect(() => {
        console.log("StartFetching");
        loadTasks()
            .then((tasks) => {
                dispatchTasks({
                    type: "asyncInit",
                    initTasks: tasks,
                });
            })
            .catch((e) => {
                console.log(e);
                dispatchTasks({
                    type: "asyncInit",
                    initTasks: [],
                });
            });
    }, []);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatchTasks}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useTasks() {
    return useContext(TasksContext);
}

export function useTasksDispatch() {
    const dispatchTasks = useContext(TasksDispatchContext);
    if (!dispatchTasks) {
        throw Error(
            "useTasksDispatch must be used inside TasksContext.Provider"
        );
    }
    return dispatchTasks;
}

type DispatchTaskAction =
    | { type: "asyncInit"; initTasks: ITask[] }
    | {
          type: "add";
          title: string;
          description?: string;
          parentTask?: ITask;
      }
    | { type: "edit"; task: ITask }
    | { type: "remove"; task: ITask };

function removeTask(
    parentTasks: ITask[] | undefined,
    taskToRemove: ITask
): ITask[] | undefined {
    if (!parentTasks) return undefined;
    return parentTasks
        .filter((tempTask) => tempTask.id !== taskToRemove.id)
        .map((tempTask) => {
            return {
                ...tempTask,
                subtasks: removeTask(tempTask.subtasks, taskToRemove),
            };
        });
}

function tasksReducer(prevTasks: ITask[], action: DispatchTaskAction): ITask[] {
    switch (action.type) {
        case "asyncInit": {
            return action.initTasks;
        }

        case "add": {
            const newTask: ITask = {
                id: uuidv4(),
                title: action.title,
                description: action.description,
            };
            const parentTask = structuredClone(action.parentTask);
            if (!parentTask) return [...prevTasks, newTask];
            if (!parentTask.subtasks) {
                parentTask.subtasks = [newTask];
            } else {
                parentTask.subtasks.push(newTask);
            }
            return tasksReducer(prevTasks, {
                type: "edit",
                task: parentTask,
            });
        }

        case "remove": {
            const newTasks = removeTask(prevTasks, action.task);
            return newTasks ? newTasks : [];
        }

        case "edit": {
            return prevTasks.map((tempTask) =>
                tempTask.id === action.task.id ? action.task : tempTask
            );
        }

        default:
            console.log(action);
            return prevTasks;
    }
}
