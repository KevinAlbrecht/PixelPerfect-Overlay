import { FileEntry } from "@tauri-apps/api/fs";

type FileItem = {
  name: string;
  extension: string;
  path: string;
};

export type ImageFile = {
  b64: string;
  name: string;
  width: number;
  height: number;
};
