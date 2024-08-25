import * as fs from 'fs';

export function loadConfig() {
  return JSON.parse(fs.readFileSync('configs/config.json', 'utf-8'));
}

export const store = new Map<any, any>();
