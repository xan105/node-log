"use strict";

const debug = new (require("../log.cjs"))({
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