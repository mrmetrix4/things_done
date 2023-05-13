import Task from "./Task";
import fetchTasksPath from "../io/fetchTasksPath";
import readJsonFile from "../io/readJsonFile";
import writeJsonFile from "../io/writeJsonFile";
import { useState } from "react";

var tasksPath: string;

export async function loadTasks(): Promise<Task[]> {
    if (!tasksPath) {
        tasksPath = await fetchTasksPath();
    }
    const tasks: Task[] = await readJsonFile(tasksPath);
    return tasks;
}

export async function dumpTasks(tasks: Task[]): Promise<void> {
    await writeJsonFile(tasksPath, tasks);
}
