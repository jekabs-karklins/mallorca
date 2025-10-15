export interface Logger {
  log(message: string, ...optionalParams: any[]): void;
  info(message: string, ...optionalParams: any[]): void;
  warn(message: string, ...optionalParams: any[]): void;
  error(message: string, ...optionalParams: any[]): void;
}

class ConsoleLogger implements Logger {
  log(message: string, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  info(message: string, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }
}

export const logger = new ConsoleLogger();
