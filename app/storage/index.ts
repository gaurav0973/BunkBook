export interface StorageProvider {
    saveImage(buffer: Buffer, extension: string): Promise<string>;
}