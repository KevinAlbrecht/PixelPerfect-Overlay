import { useState } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

import { invokeOpenOverlay, invokeReadFileAsb64 } from "./interop";
import "./App.css";

function App() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  async function openFolder() {
    try {
      const path = await open({
        directory: true,
        title: "Open assets folder",
      });

      if (!path || typeof path === typeof Array) {
        console.warn("chosen folder was empty or multiple");
        return;
      }

      const safePath: string = path as string;

      setCurrentPath(safePath);
      setImages([]);

      const fileEntries = await readDir(safePath);

      for (const entry of fileEntries) {
        if (!entry.name) continue;

        const sp = entry.name.split(".");
        var last = sp[sp.length - 1];
        if (["jpg", "jpeg", "png"].includes(last)) {
          const b64 = await invokeReadFileAsb64(entry.path);
          setImages((arr) => [...arr, b64]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function openOverlay() {
    await invokeOpenOverlay();
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
            <li key={i} onClick={openOverlay}>
              <img src={`data:image/png;base64,${e}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
