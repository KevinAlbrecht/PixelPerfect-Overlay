// Files = png,jpg
// text/plain = css,svg

import { ImageFile, ImageFileType } from "../models";
import { getImageSize } from "../utils";

enum FileTypeAvailable {
  Files = "Files",
  Text = "text/plain",
}
var URLObj = window.URL || window.webkitURL;

export const getImageFileFromClipboard = async (
  e: React.ClipboardEvent
): Promise<ImageFile> => {
  const dt = e.clipboardData;
  const f = dt.files[0];
  let getFromItem: (f: File) => string;

  switch (dt.types[0]) {
    case FileTypeAvailable.Files:
      getFromItem = getObjectUrlFromFile;
      break;
    case FileTypeAvailable.Text:
      getFromItem = getObjectUrlFromText;
      break;
    default:
      return Promise.reject("Wrong file type");
  }

  const objUrl = getFromItem(f);

  const { width, height } = await getImageSize(objUrl,ImageFileType.ObjectUrl);

  return {
    source: objUrl,
    height,
    width,
    name: f.name,
    sourceType:ImageFileType.ObjectUrl
  };
};

const getObjectUrlFromFile: (f: File) => string = URLObj.createObjectURL;

const getObjectUrlFromText = (f: File) => {
  return "lol";
};
