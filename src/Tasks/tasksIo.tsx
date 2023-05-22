import Task from "./Task";
import { readDataFile, writeDataFile } from "../io/dataIo";

const tasksFilePath: string = "tasks.json";

export async function loadTasks(): Promise<Task[]> {
    const tasks: Task[] = await readDataFile(tasksFilePath);
    return tasks;
}

export async function dumpTasks(tasks: Task[]): Promise<void> {
    await writeDataFile(tasksFilePath, tasks);
}
