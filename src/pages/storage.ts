import fs from "fs/promises";
import path from "path";

export async function saveDataToJson(
    data: unknown,
    filename: string,
): Promise<void> {
    try {
        const outDir = path.join(process.cwd(), "data");
        const filePath = path.join(outDir, filename);

        await fs.mkdir(outDir, { recursive: true });

        const jsonString = JSON.stringify(data, null, 2);

        await fs.writeFile(filePath, jsonString, "utf-8");

        console.log("Successfully stored all quotes in ", filePath);
    } catch (error) {
        console.error("Error with saving to storage");
        throw error;
    }
}
