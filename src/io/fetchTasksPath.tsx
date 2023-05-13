import { createDir, exists, BaseDirectory } from "@tauri-apps/api/fs";
import readJsonFile from "./readJsonFile";
import writeJsonFile from "./writeJsonFile";
import { open } from "@tauri-apps/api/dialog";

const configFilename: string = "things-done.json";
const configDir: number = BaseDirectory.AppConfig;

async function getConfig(): Promise<any> {
    await createDir("", { dir: configDir, recursive: true });
    if (await exists(configFilename, { dir: configDir })) {
        return await readJsonFile(configFilename, { dir: configDir });
    }
    updateConf({});
    return getConfig();
}

async function updateConf(newConfig: any): Promise<void> {
    await writeJsonFile(configFilename, newConfig, {
        dir: configDir,
    });
}

async function promptTasksPath(): Promise<string> {
    const tasksPath = await open({
        multiple: false,
        filters: [
            {
                name: "JSON file",
                extensions: ["json"],
            },
        ],
    });
    if (!tasksPath || Array.isArray(tasksPath)) {
        return promptTasksPath();
    }
    updateConf({ tasksPath: tasksPath });
    return tasksPath;
}

async function fetchTasksPath(): Promise<string> {
    console.log("fetchTasksPath called.");
    const config: any = await getConfig();
    if (config.tasksPath) {
        return config.tasksPath;
    }
    return await promptTasksPath();
}

export default fetchTasksPath;
