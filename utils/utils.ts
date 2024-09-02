import * as fs from 'fs';

export function loadConfig(configFileName: string) {
  return JSON.parse(fs.readFileSync(`./configs/${configFileName}`, 'utf-8'));
}

export const store = new Map<any, any>();
