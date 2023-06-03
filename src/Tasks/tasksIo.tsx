import { readDataFile, writeDataFile } from "../io/dataIo";
import { ITask } from "./TasksContext";

const tasksFilePath: string = "tasks.json";

export async function loadTasks(): Promise<ITask[]> {
    const tasks: ITask[] = await readDataFile(tasksFilePath);
    return tasks;
}

export async function dumpTasks(tasks: ITask[]): Promise<void> {
    await writeDataFile(tasksFilePath, tasks);
}
