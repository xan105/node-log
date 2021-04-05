A very simple logger.

Install
-------

```
npm install @xan105/node-log
```

Usage example
-------------

```js
//CommonJS
const debug = new (require("@xan105/log"))({
  console: true,
  file: "./example.log")
});

//ESM
import logger from "@xan105/log";
const debug = new logger({
  console: true,
  file: "./example.log"
});

debug.log("this is a string");
debug.log("this is a string","info");
debug.info("this is a string");
debug.warn("this is a warning");
debug.error("this is an error");
```