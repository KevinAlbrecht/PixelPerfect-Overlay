import { invoke } from "@tauri-apps/api/tauri";

export async function invokeReadFileAsb64(path: string): Promise<string> {
  return invoke("read_file", { path });
}

export async function invokeOpenOverlay() {
  return invoke("open_overlay");
}

export async function invokeResizeWindow(width: number, height: number) {
  return invoke("resize_overlay", {width,height} );
}
