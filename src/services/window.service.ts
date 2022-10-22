import { WebviewWindow } from "@tauri-apps/api/window";

const overlayWindowId = "overlay";

enum OverlayEvent {
  DisplayImg = "DisplayImg",
}

const getOverlayWindow = () => WebviewWindow.getByLabel(overlayWindowId);

export const sendDisplayImg = (b64: string) => {
  const overlayWindow = getOverlayWindow();
  if (!window) return;

  overlayWindow?.emit(OverlayEvent.DisplayImg, b64);
};
