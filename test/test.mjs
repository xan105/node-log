import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import logger from "../esm.mjs";

const debug = new logger({
  console: true,
  file: __dirname + "/test.txt"
});

debug.log("this is a string");
debug.warn("this is a warning");
debug.error("this is an error");

debug.log({test: 0, bol: true});
debug.warn({test: 0, bol: true});
debug.error({test: 0, bol: true});

debug.log(new Error("this is an error"));
debug.warn(new Error("this is an error"));
debug.error(new Error("this is an error"));

try{
  throw "this is an error";
}catch(err){
  debug.error(err);
}