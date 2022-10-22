import { listen } from "./node_modules/@tauri-apps/api/event";

await (async function init() {
  console.log("Init");

  const unlisten = await listen("DisplayImg", (receivedEvent) => {
    console.log("totus", receivedEvent.payload);
    window.b64 = receivedEvent.payload;
    document.querySelector("img#main-image")["src"] =
      receivedEvent.payload;
  });
})();
