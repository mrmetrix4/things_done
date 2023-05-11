import { FsOptions, writeTextFile } from "@tauri-apps/api/fs";

async function writeJsonFile(
    path: string,
    contents: any,
    options?: FsOptions
): Promise<void> {
    const stringJson: string = JSON.stringify(contents);
    await writeTextFile(path, stringJson, options);
}

export default writeJsonFile;
