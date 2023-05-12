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

async function promptThingsPath(): Promise<string> {
    const thingsPath = await open({
        multiple: false,
        filters: [
            {
                name: "JSON file",
                extensions: ["json"],
            },
        ],
    });
    if (!thingsPath || Array.isArray(thingsPath)) {
        return promptThingsPath();
    }
    updateConf({ thingsPath: thingsPath });
    return thingsPath;
}

async function fetchThingsPath(): Promise<string> {
    const config: any = await getConfig();
    if (config.thingsPath) {
        return config.thingsPath;
    }
    return await promptThingsPath();
}

export default fetchThingsPath;
