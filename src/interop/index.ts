import { invoke } from "@tauri-apps/api/tauri";

export async function invokeReadFileAsb64(path: string): Promise<string> {
  return invoke("read_file", { path });
}

export async function invokeOpenOverlay(): Promise<never> {
  return invoke("open_overlay");
}
