declare interface ILoggerOptions {
  console?: boolean,
  file?: string | null,
  appendToFile?: boolean
}

declare class Logger {
  constructor(option?: ILoggerOptions);
  log(event: any, level: string): void;
  info(event: any): void;
  warn(event: any): void;
  error(event: any): void;
}

export default Logger;