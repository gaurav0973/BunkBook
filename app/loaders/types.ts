export type SourceType =
    | "pdf"
    | "youtube"
    | "website"
    | "markdown"
    | "text"
    | "docx";

export type LoadSourceParams =
    | {
          sourceType: "pdf";
          filePath: string;
      }
    | {
          sourceType: "youtube";
          url: string;
      }
    | {
          sourceType: "website";
          url: string;
      }
    | {
          sourceType: "markdown";
          filePath: string;
      }
    | {
          sourceType: "text";
          filePath: string;
      }
    | {
          sourceType: "docx";
          filePath: string;
      };