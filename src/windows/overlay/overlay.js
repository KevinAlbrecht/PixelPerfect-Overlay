import { listen, emit } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

const PAGE_LOADED_EVENT = "PageLoaded";
const RESIZE_WINDOW_EVENT = "ResizeWindow";
const DISPLAY_IMG_EVENT = "DisplayImg";

const B64_IMAGE_FILE_TYPE = "B64";
const B64_PREFIX = "data:image/png;base64, ";

const sizeValueEl = document.querySelector("span#size-value");
const contentsEl = document.querySelector("#contents");
const contentMainImgEl = document.querySelector("img#main-image");

let originalWidth;
let resizeRatio = 100;

function addDomEvents() {
  document
    .querySelector("input#opacity-input")
    .addEventListener("input", updateRange);
  document.querySelector("#size-input").addEventListener("click", updateSize);
  document
    .querySelector("#titlebar-close")
    .addEventListener("click", appWindow.close);
}

function updateRange(e) {
  contentsEl.style["opacity"] = e.target.value / 100;
}

function updateSize(e) {
  if (!e.target.classList.contains("size-input-button")) return;

  const toAdd = +e.target.dataset.value;
  
  if((resizeRatio<=50 && toAdd<0) || (resizeRatio>=150 && toAdd>0)) return;
  resizeRatio += toAdd;

  sizeValueEl.innerText = resizeRatio + "%";
  const newSize = (resizeRatio * originalWidth) / 100;

   contentMainImgEl.width = newSize;
   emitResizeWindow(contentMainImgEl.width, contentMainImgEl.height);
}

function onReceiveImage(receivedEvent) {
  const payload = JSON.parse(receivedEvent.payload);
  contentMainImgEl["src"] = `${
    payload.sourceType === B64_IMAGE_FILE_TYPE ? B64_PREFIX : ""
  }${payload.source}`;

  originalWidth = payload.width;
}

async function emitPageLoaded() {
  await emit(PAGE_LOADED_EVENT, { isLoaded: true });
}

async function emitResizeWindow(width, height) {
  await emit(RESIZE_WINDOW_EVENT, { width, height });
}

(async function init() {
  addDomEvents();
  await listen(DISPLAY_IMG_EVENT, onReceiveImage);
  emitPageLoaded();
})();
