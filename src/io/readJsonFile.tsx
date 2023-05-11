import { FsOptions, readTextFile } from "@tauri-apps/api/fs";

async function readJsonFile(
    filePath: string,
    options?: FsOptions
): Promise<any> {
    const data: string = await readTextFile(filePath, options);
    const jsonData: any = JSON.parse(data);
    return jsonData;
}

export default readJsonFile;
