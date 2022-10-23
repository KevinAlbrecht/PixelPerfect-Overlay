import { once, emit } from "/node_modules/@tauri-apps/api/event";

const PAGE_LOADED_EVENT = "PageLoaded";
const DISPLAY_IMG_EVENT = "DisplayImg";

const opacityValueEl = document.querySelector("span#opacity-value");
const contentsEl = document.querySelector("#contents");
const contentMainImgEl = document.querySelector("img#main-image");

function addDomEvents() {
  document
    .querySelector("input#opacity-input")
    .addEventListener("input", updateRange);
}

function updateRange(e) {
  opacityValueEl.innerText = e.target.value;
  contentsEl.style["opacity"] = e.target.value / 100;
}

function onReceiveImage(receivedEvent) {
  const payload = JSON.parse(receivedEvent.payload);
  contentMainImgEl["src"] = `data:image/png;base64,${payload.b64}`;
}

function notifyPageLoaded() {
  emit(PAGE_LOADED_EVENT, { isLoaded: true });
}

await (async function init() {
  addDomEvents();
  await once(DISPLAY_IMG_EVENT, onReceiveImage);
  notifyPageLoaded();
})();
