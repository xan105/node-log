About
=====

A very simple logger.

Install
=======

```
npm install @xan105/log
```

Usage example
=============

```js
import Logger from "@xan105/log";
const debug = new Logger({
  console: true,
  file: "./example.log",
  appendToFile: false //create a new file
});

debug.log("this is a string");
debug.log("this is a string","info");
debug.info("this is a string");
debug.warn("this is a warning");
debug.error("this is an error");
```

Log in the same file from different places

```js
//Wrapper "log.js"
import Logger from "@xan105/log";
const debug = new Logger({
  console: true,
  file: "./example.log"
});
export { debug };

//file a "a.js"
import { debug } from "./log.js";
debug.log("this is a");

//file b "b.js"
import { debug } from "./log.js";
debug.log("this is b");

//Both output in ./example.log
```

API
===

⚠️ This module is only available as an ECMAScript module (ESM) starting with version 2.0.0.<br />
Previous version(s) are CommonJS (CJS) with an ESM wrapper.

## Default export

### `(option?: obj): class`

#### option ⚙️

|name|type|default|description|
|----|----|-------|-----------|
|console|bool|false|log to the console|
|file|string/null|null|log to given filePath|
|appendToFile|bool|false|write mode: append to file or create new|

Return an instance of the `Logger` class with the following methods:

#### `log(event: any, level: string): void`
Accepted level: "info", "warn", "error".<br/>
Default to "info".

#### `info(event: any): void`
Alias of log level info

#### `warn(event: any): void`
Alias of log level warn

#### `error(event: any): void`
Alias of log level error