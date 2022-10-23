import { invoke } from "@tauri-apps/api/tauri";
import { WebviewWindow } from "@tauri-apps/api/window";

export const OVERLAY_WINDOW_ID = "overlay";

export const getOverlayWindow = () =>
  WebviewWindow.getByLabel(OVERLAY_WINDOW_ID);

export async function invokeReadFileAsb64(path: string): Promise<string> {
  return invoke("read_file", { path });
}

export async function invokeOpenOverlay() {
  const currentWindow = getOverlayWindow();

  if (currentWindow) return true;
  await invoke("open_overlay");
  return false;
}

export async function invokeResizeWindow(width: number, height: number) {
  return invoke("resize_overlay", { width, height });
}
