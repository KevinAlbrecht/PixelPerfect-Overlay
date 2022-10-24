import React, { useState } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

import { invokeOpenOverlay, invokeReadFileAsb64 } from "./interop";
import {
  addB64Prefix,
  getFileExtention,
  getImageSize,
  isAcceptableFiletype,
} from "./utils";
import "./App.css";
import { listenToPageLoaded } from "./services/window.service";
import { ImageFile, ImageFileType } from "./models";
import { getImageFileFromClipboard } from "./services/Clipboard.service";

async function openOverlay(e: ImageFile) {
  const isWindowAlreadyDisplayed = await invokeOpenOverlay();
  await listenToPageLoaded(e, isWindowAlreadyDisplayed);
}

function App() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);

  async function openFolder() {
    try {
      const path = await open({
        directory: true,
        title: "Open assets folder",
      });

      if (!path || Array.isArray(path)) {
        console.warn("chosen folder was empty or multiple");
        return;
      }

      setCurrentPath(path);
      const fileEntries = await readDir(path);

      const imagesToSet: ImageFile[] = [];

      for (const entry of fileEntries) {
        if (!entry.name) continue;

        const entryFiletype = getFileExtention(entry.name);

        if (entryFiletype && isAcceptableFiletype(entryFiletype)) {
          const source = await invokeReadFileAsb64(entry.path);

          const { width, height } = await getImageSize(source,ImageFileType.B64);
          imagesToSet.push({
            source,
            name: entry.name!,
            width,
            height,
            sourceType:ImageFileType.B64
          });
        }
      }

      setImages(imagesToSet);
    } catch (e) {
      console.error(e);
    }
  }

  async function onPaste(e: React.ClipboardEvent) {
    const img = await getImageFileFromClipboard(e);
    if (!img) return;

    await openOverlay(img);
  }

  return (
    <div className="container" onPaste={async (a) => await onPaste(a)}>
      <div className="row">
        <span>{currentPath}</span>
      </div>

      <div className="grid-wrapper">
        <button onClick={() => openFolder()}>Open folder</button>
        <ul className="grid">
          {images.map((e, i) => (
            <li key={i} onClick={() => openOverlay(e)}>
              <img src={`data:image/png;base64,${e.source}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
