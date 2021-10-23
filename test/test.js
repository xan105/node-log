import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import Logger from "../lib/esm.js";

const debug = new Logger({
  console: false,
  file: join(__dirname,"test.txt"),
  maxSize: 3
});

for (let i = 0; i < 10; i++) 
{ 
  debug.log(i);
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
}