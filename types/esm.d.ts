declare interface ILoggerOptions {
  console?: bool,
  file?: string | null,
  appendToFile?: bool
}

declare class Logger {
  constructor(option?: ILoggerOptions);
  log(event: any, level: string): void;
  info(event: any): void;
  warn(event: any): void;
  error(event: any): void;
}

export default Logger;