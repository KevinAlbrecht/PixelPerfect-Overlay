import { WebviewWindow } from "@tauri-apps/api/window";

const overlayWindowId = "overlay";

enum OverlayEvent {
  DisplayImg = "DisplayImg",
  PageLoaded = "PageLoaded",
}

const getOverlayWindow = () => WebviewWindow.getByLabel(overlayWindowId);

let currentUnlistenFn:Function;

export const sendDisplayImg = async (b64: string) => {
  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  await overlayWindow.emit(OverlayEvent.DisplayImg, b64);
};

export const listenToPageLoaded = async (b64: string) => {

  const overlayWindow = getOverlayWindow();
  if (!overlayWindow) return;

  if (currentUnlistenFn) currentUnlistenFn();

  console.log('listen1');

  currentUnlistenFn = await overlayWindow.listen(
    OverlayEvent.PageLoaded,
    async () => {
  console.log('PageLoaded');

      await overlayWindow.emit(OverlayEvent.DisplayImg, b64);
    }
  );
};
