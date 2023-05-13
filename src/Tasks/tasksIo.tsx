import Task from "./Task";
import fetchThingsPath from "../io/fetchThingsPath";
import readJsonFile from "../io/readJsonFile";
import writeJsonFile from "../io/writeJsonFile";

const thingsPath: string = await fetchThingsPath();

export async function loadTasks(): Promise<Task[]> {
    const things: Task[] = await readJsonFile(thingsPath);
    return things;
}

export async function dumpTasks(tasks: Task[]): Promise<void> {
    await writeJsonFile(thingsPath, tasks);
}
