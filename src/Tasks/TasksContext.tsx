import {
    Dispatch,
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { loadTasks } from "./tasksIo";

export interface ITask {
    id: string;
    title: string;
    description?: string;
    subtasksIDs?: string[];
    parentTaskID?: string;
    doneTime?: Date;
}

type DispatchTaskAction =
    | { type: "asyncInit"; initTasks: ITask[] }
    | { type: "reload" }
    | {
          type: "add";
          title: string;
          description?: string;
          parentTaskID?: string;
      }
    | { type: "edit"; task: ITask }
    | { type: "done"; task: ITask }
    | { type: "remove"; task: ITask };

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
            "useTasksDispatch must be used inside TodoContext.Provider"
        );
    }
    return dispatchTasks;
}

function findAllSubtasks(
    taskList: ITask[],
    removeIDs: Set<string>
): Set<string> {
    if (taskList.length === 0) {
        return removeIDs;
    }
    for (const tempTask of taskList) {
        if (
            removeIDs.has(tempTask.id) ||
            (tempTask.parentTaskID && removeIDs.has(tempTask.parentTaskID))
        ) {
            removeIDs.add(tempTask.id);
            findAllSubtasks(
                taskList.filter((t) => t.parentTaskID === tempTask.id),
                removeIDs
            );
        }
    }

    return removeIDs;
}

function tasksReducer(prevTasks: ITask[], action: DispatchTaskAction): ITask[] {
    switch (action.type) {
        case "asyncInit": {
            return action.initTasks;
        }
        case "add":
            return [
                ...prevTasks,
                {
                    id: uuidv4(),
                    title: action.title,
                    description: action.description,
                    parentTaskID: action.parentTaskID,
                },
            ];
        case "remove":
            const idsToRemove = findAllSubtasks(
                prevTasks,
                new Set([action.task.id])
            );
            return prevTasks.filter((t) => !idsToRemove.has(t.id));
        default: {
            console.log(action);
            return prevTasks;
        }
    }
}
