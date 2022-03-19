/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { EOL } from "node:os";
import { parse } from "node:path";
import { inspect } from "node:util";
import { mkdirSync, createWriteStream } from "node:fs";

const code = {
  reset : "\x1b[0m",
  bright : "\x1b[1m",
  dim : "\x1b[2m",
  underscore : "\x1b[4m",
  blink : "\x1b[5m",
  reverse : "\x1b[7m",
  hidden : "\x1b[8m",
  black : "\x1b[30m",
  grey : "\x1b[90m",
  red : "\x1b[31m",
  green : "\x1b[32m",
  yellow : "\x1b[33m",
  blue : "\x1b[34m",
  magenta : "\x1b[35m",
  cyan : "\x1b[36m",
  white : "\x1b[37m",
  bgBlack : "\x1b[40m",
  bgRed : "\x1b[41m",
  bgGreen : "\x1b[42m",
  bgYellow : "\x1b[43m",
  bgBlue : "\x1b[44m",
  bgMagenta : "\x1b[45m",
  bgCyan : "\x1b[46m",
  bgWhite : "\x1b[47m"
};

class Logger {
  #stream;
  
  constructor(option = {}) {
    this.options = {
      console: option.console || false,
      file: option.file || null,
      appendToFile: option.appendToFile || false,
    };
      
    if(this.options.file) this.#createStream();
  }

  #createStream(){
    mkdirSync(parse(this.options.file).dir, { recursive: true });
      
    const flag = this.options.appendToFile === true ? "a" : "w";
    this.#stream = createWriteStream(this.options.file, { flags: flag, encoding: "utf8"})
    .on('error', function(err){
      console.warn(err);
    });
  }
  
  #timeStamp() {
    const date = new Date();
    const dmy = `${("0"+date.getDate()).substr(-2)}/${("0"+(date.getMonth()+1)).substr(-2)}/${date.getFullYear() % 100}`;
    const hms = `${("0"+date.getHours()).substr(-2)}:${("0"+date.getMinutes()).substr(-2)}:${("0"+date.getSeconds()).substr(-2)}`;
    const ms = `.${("00"+date.getMilliseconds()).substr(-3)}`;
    return { date: dmy, hms: hms, ms: ms};
  }
  
  log(event, level = "info") {
    const levels = {
      info : { prefix: "INFO", color: code.bright },
      warn : { prefix: "WARN", color: code.bright + code.yellow },
      error : { prefix: "FAIL", color: code.bright + code.red }
    };
    if ( !Object.keys(levels).includes(level) ) level = "info";

    const time = this.#timeStamp();

    if(this.options.console) 
    {
      if (typeof window !== 'undefined' && typeof window.document !== 'undefined') //Browser (electron,NW.js,...)
      {
        const header = `%c[${time.hms}%c${time.ms}%c]%c`;
        const css = ["font-weight:bold","color: grey","color: inherit; font-weight:bold","font-weight:initial"];
        const msg = (event === Object(event)) ? `${header} ${EOL}` + inspect(event, {colors: true, depth: null}) : `${header} ${event}`;
            
        if (event instanceof Error || level === "error") {
          console.error(msg,...css);
        } else if (level === "warn") {
          console.warn(msg,...css);
        } else {
          css[0] += ";padding-left:10px";
          console.log(msg,...css);
        }     
      } 
      else 
      {
        const header = `${code.bright}[${time.hms}${code.grey}${time.ms}${code.reset} ${levels[level].color}${levels[level].prefix}${code.white}]${code.reset}`;
        const msg = (event === Object(event)) ? `${header} ${EOL}` + inspect(event, {colors: true, depth: null}) : `${header} ${event}`;
            
        if (event instanceof Error || level === "error") {
          console.error(msg);
        } else if (level === "warn") {
          console.warn(msg);
        } else {
          console.log(msg);
        }    
      }
    }
      
    if(this.options.file) 
    {
      const header = `[${time.date} ${time.hms}${time.ms} ${levels[level].prefix}]`;

      if(event === Object(event)) 
      {
        if (event instanceof Error) {
          this.#stream.write(`${header}${EOL}` + event.stack.toString().replace(/\n/g, EOL) + EOL);
        } else {
          this.#stream.write(`${header}${EOL}` + JSON.stringify(event, null, 2).replace(/\n/g, EOL) + EOL);
        } 
      } 
      else 
      {
        this.#stream.write(`${header} ${event}${EOL}`);
      }
    }
  }
    
  //alias
  info(event){ this.log(event,"info") }
  warn(event){ this.log(event,"warn") }
  error(event){ this.log(event,"error") }
}

export { Logger as default };