import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { FileEntry, readDir, readBinaryFile } from "@tauri-apps/api/fs";
import { open } from "@tauri-apps/api/dialog";

import "./App.css";
import { format } from "path";

function App() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  async function openFolder() {
    try {
      const path = await open({
        directory: true,
        title: "Open assets folder",
      });

      if (!path || typeof path === typeof Array)
        throw new Error("wrong folder");

      setImages([]);
      setCurrentPath(path as string);
      const fileEntries = await readDir(currentPath);

      for (const entry of fileEntries) {
        if (!entry.name) continue;

        const sp = entry.name.split(".");
        var last = sp[sp.length - 1];
        if (["jpg", "jpeg", "png"].includes(last)) {
          const b64 = await readFileAsb64(entry.path);
          setImages((arr) => [...arr, b64]);
        }
      }
    } catch (e) {
      console.error(e);
    }
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
            <li key={i}>
              <img src={`data:image/png;base64,${e}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

const readFileAsb64 = async (path: string): Promise<string> =>
  invoke("read_file", { path });
