import { useState } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

import { invokeOpenOverlay, invokeReadFileAsb64 } from "./interop";
import { addB64Prefix, getFileExtention, isAcceptableFiletype } from "./utils";
import "./App.css";
import { listenToPageLoaded } from "./services/window.service";
import { ImageFile } from "./models";

async function openOverlay(e: ImageFile) {
  await invokeOpenOverlay();
  await listenToPageLoaded(e);
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
          const b64 = await invokeReadFileAsb64(entry.path);
          const img = new Image();
          img.onload = () => {
            const { width, height } = img;
            const imgFile: ImageFile = {
              b64,
              name: entry.name!,
              width,
              height,
            };
            imagesToSet.push(imgFile);
          };
          img.src = addB64Prefix(b64);
        }
      }

      setImages(imagesToSet);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <span>{currentPath}</span>
      </div>

      <div className="grid-wrapper">
        <button onClick={() => openFolder()}>Open folder</button>
        <ul className="grid">
          {images.map((e, i) => (
            <li key={i} onClick={() => openOverlay(e)}>
              <img src={`data:image/png;base64,${e.b64}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
