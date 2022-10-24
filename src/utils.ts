import { FILETYPES, BASE64_PREFIX } from "./constants";
import { ImageFileType } from "./models";

export const isAcceptableFiletype = (ft: string) => FILETYPES.includes(ft);

export const getFileExtention = (name: string) => name.split(".").pop();

export const addB64Prefix = (b64: string) => `${BASE64_PREFIX}${b64}`;

export const getImageSize = (
  source: string,
  sourceType: ImageFileType
): Promise<{ width: number; height: number }> => {
  const imgContainer = new Image();
  imgContainer.src =
    sourceType === ImageFileType.B64 ? addB64Prefix(source) : source;

  return new Promise((resolve) => {
    imgContainer.onload = () =>
      resolve({ height: imgContainer.height, width: imgContainer.width });
  });
};
