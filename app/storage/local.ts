import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { StorageProvider } from "./index";

export class LocalStorageProvider implements StorageProvider {
    async saveImage(
        imageBuffer: Buffer,
        extension = "png"
    ): Promise<string> {
        const uploadDirectory = path.join(
            process.cwd(),
            "public",
            "generated-images"
        );

        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, {
                recursive: true,
            });
        }

        const fileName = `${randomUUID()}.${extension}`;

        const filePath = path.join(
            uploadDirectory,
            fileName
        );

        fs.writeFileSync(filePath, imageBuffer);

        return `/api/images/${fileName}`;
    }
}