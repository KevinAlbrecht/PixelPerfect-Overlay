import { FILETYPES, BASE64_PREFIX } from "./constants";

export const isAcceptableFiletype = (ft:string)=>FILETYPES.includes(ft);

export const getFileExtention = (name:string)=>name.split(".").pop();

export const addB64Prefix = (b64:string)=>`${BASE64_PREFIX}${b64}`;