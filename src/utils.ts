import { FILETYPES } from "./constants";

export const isAcceptableFiletype = (ft:string)=>FILETYPES.includes(ft);

export const getFileExtention = (name:string)=>name.split(".").pop();
