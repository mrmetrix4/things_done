import { createDir, exists, BaseDirectory } from "@tauri-apps/api/fs";

const configFilename: string = "things-done.json";
const configDir: number = BaseDirectory.AppConfig;

async function fetchThingsPath(): Promise<string> {
    return "";
}
