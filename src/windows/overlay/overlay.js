import { listen, emit } from "/node_modules/@tauri-apps/api/event";

const PAGE_LOADED_EVENT = "PageLoaded";
const DISPLAY_IMG_EVENT = "DisplayImg";

const B64_IMAGE_FILE_TYPE = "B64";
const B64_PREFIX = "data:image/png;base64, ";


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
  contentMainImgEl["src"] = `${payload.sourceType === B64_IMAGE_FILE_TYPE?B64_PREFIX:''}${payload.source}`;
}

function notifyPageLoaded() {
  emit(PAGE_LOADED_EVENT, { isLoaded: true });
}

(async function init() {
  addDomEvents();
  await listen(DISPLAY_IMG_EVENT, onReceiveImage);
  notifyPageLoaded();
})();
