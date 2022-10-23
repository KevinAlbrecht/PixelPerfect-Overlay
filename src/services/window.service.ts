import { WebviewWindow } from "@tauri-apps/api/window";
import { invokeOpenOverlay } from "../interop";
import { ImageFile } from "../models";

const overlayWindowId = "overlay";

enum OverlayEvent {
  DisplayImg = "DisplayImg",
  PageLoaded = "PageLoaded",
}

const getOverlayWindow = () => WebviewWindow.getByLabel(overlayWindowId);

let currentUnlistenFn:Function;

export async function openOverlay(image: ImageFile) {
  await invokeOpenOverlay();
  await listenToPageLoaded(image)
}

export const sendDisplayImg = async (b64: string) => {
  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  await overlayWindow.emit(OverlayEvent.DisplayImg, b64);
};

export const listenToPageLoaded = async (image: ImageFile) => {

  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  if (currentUnlistenFn) currentUnlistenFn();

  currentUnlistenFn = await overlayWindow.once(
    OverlayEvent.PageLoaded,
    async () => {

      await overlayWindow.emit(OverlayEvent.DisplayImg, image);
    }
  );
};
