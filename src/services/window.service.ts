import { WebviewWindow } from "@tauri-apps/api/window";
import {
  getOverlayWindow,
  invokeOpenOverlay,
  invokeResizeWindow,
} from "../interop";
import { ImageFile } from "../models";

enum OverlayEvent {
  DisplayImg = "DisplayImg",
  PageLoaded = "PageLoaded",
}

export const sendDisplayImg = async (b64: string) => {
  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  await overlayWindow.emit(OverlayEvent.DisplayImg, b64);
};

export const listenToPageLoaded = async (
  image: ImageFile,
  isAlreadyListening = false
) => {
  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  if(isAlreadyListening){
    emitDisplayImage(overlayWindow,image);
    return;
  }

  await overlayWindow.once(
    OverlayEvent.PageLoaded,
    async () => emitDisplayImage(overlayWindow,image)
  );
};

const emitDisplayImage = async (
  window: WebviewWindow,
  image: ImageFile
) => {
  await window.emit(OverlayEvent.DisplayImg, image);
  await invokeResizeWindow(image.width, image.height);
};
