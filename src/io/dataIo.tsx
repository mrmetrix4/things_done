import {
    createDir,
    exists,
    BaseDirectory,
    copyFile,
    readDir,
    FileEntry,
    removeFile,
} from "@tauri-apps/api/fs";
import readJsonFile from "./readJsonFile";
import writeJsonFile from "./writeJsonFile";
import { open } from "@tauri-apps/api/dialog";
import { appDataDir, join } from "@tauri-apps/api/path";

const configFilename: string = "things-done.json";
const configDir: number = BaseDirectory.AppConfig;

var privateDataDir: string;

async function getConfig(): Promise<any> {
    await createDir("", { dir: configDir, recursive: true });
    if (await exists(configFilename, { dir: configDir })) {
        return await readJsonFile(configFilename, { dir: configDir });
    }
    updateConf({});
    return getConfig();
}

async function copyDirFiles(oldDir: string, newDir: string) {
    console.log(oldDir);
    console.log(newDir);
    const fileEntries: FileEntry[] = await readDir(oldDir);
    for (const entry of fileEntries) {
        if (entry.children || !entry.name) {
            continue;
        }
        copyFile(entry.path, await join(newDir, entry.name));
        removeFile(entry.path);
    }
}

async function updateConf(newConfig: any): Promise<void> {
    await writeJsonFile(configFilename, newConfig, {
        dir: configDir,
    });
}

export async function setDataDir(): Promise<void> {
    const dataDir = await open({
        multiple: false,
        directory: true,
        defaultPath: privateDataDir,
        title: "Change the directory of the application data.",
    });
    if (!dataDir || Array.isArray(dataDir)) {
        return;
    }
    updateConf({ dataDir: dataDir });
    const oldDataDir = privateDataDir;
    privateDataDir = dataDir;
    copyDirFiles(oldDataDir, privateDataDir);
}

export async function fetchDataDir(): Promise<string> {
    const config: any = await getConfig();
    if (config.dataDir) {
        return config.dataDir;
    }
    const dataDir = await join(await appDataDir(), "dataDir");
    updateConf({ dataDir: dataDir });
    return dataDir;
}

export async function getDataDir(): Promise<string> {
    if (!privateDataDir) {
        privateDataDir = await fetchDataDir();
    }
    return privateDataDir;
}

export async function readDataFile(filePath: string): Promise<any> {
    const dataDir = await getDataDir();
    const fullPath = await join(dataDir, filePath);
    return readJsonFile(fullPath);
}

export async function writeDataFile(
    filePath: string,
    contents: any
): Promise<void> {
    const dataDir = await getDataDir();
    await createDir(dataDir, { recursive: true });
    const fullPath = await join(dataDir, filePath);
    return writeJsonFile(fullPath, contents);
}
