import { useState } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

import { invokeOpenOverlay, invokeReadFileAsb64 } from "./interop";
import { getFileExtention, isAcceptableFiletype } from "./utils";
import "./App.css";
import { listenToPageLoaded } from "./services/window.service";

function App() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

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

      const imagesToSet: string[] = [];

      for (const entry of fileEntries) {
        if (!entry.name) continue;

        const entryFiletype = getFileExtention(entry.name);

        if (entryFiletype && isAcceptableFiletype(entryFiletype)) {
          const b64 = await invokeReadFileAsb64(entry.path);
          imagesToSet.push(b64);
        }
      }

      setImages(imagesToSet);
    } catch (e) {
      console.error(e);
    }
  }

  async function openOverlay(index: number) {
    await invokeOpenOverlay();
    await listenToPageLoaded(`data:image/png;base64,${images[index]}`)
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div className="row">
        <span>{currentPath}</span>
      </div>

      <div className="grid-wrapper">
        <button onClick={() => openFolder()}>Open folder</button>
        <ul className="grid">
          {images.map((e, i) => (
            <li key={i} onClick={() => openOverlay(i)}>
              <img src={`data:image/png;base64,${e}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
