import { FileEntry } from "@tauri-apps/api/fs";

type FileItem = {
  name: string;
  extension: string;
  path: string;
};

export enum ImageFileType {
  B64 = "B64",
  ObjectUrl = "ObjectUrl",
}

export type ImageFile = {
  source: string;
  name: string;
  width: number;
  height: number;
  sourceType: ImageFileType;
};
