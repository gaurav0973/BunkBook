export type FileSourceType = "pdf" | "docx"| "markdown" | "text";

export type UrlSourceType = "website"| "youtube";

export type LoadSourceParams ={
          sourceType: FileSourceType;
          filePath: string;
      }
    | {
          sourceType: UrlSourceType;
          url: string;
      };