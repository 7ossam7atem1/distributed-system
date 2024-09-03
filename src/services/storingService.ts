import { store } from '../../utils/utils';

import { sendRequest } from './nodeController';

export function setKey(
  key: string,
  value: string,
  forwarded: string,
  nodes: string[]
): string {
  if (!key || !value) {
    console.error('Received inappropriate OR incomplete SET command.');
    return `ERROR: SET command must include key and value.`;
  }

  if (store.has(key)) {
    console.error(`Key "${key}" already exists.`);
    return `ERROR: Key "${key}" already exists, It must be unique.`;
  }

  store.set(key, value);
  console.log(`Success: SET Key=${key} value=${value}`);

  sendRequest('SET', key, value, nodes, forwarded);

  return `Success: Key "${key}" has been set with value "${value}".`;
}

export function getKey(key: string, forwarded: string, node: string[]): string {
  if (!key) {
    console.error('Received incomplete GET command.');
    return `ERROR: GET command must include key.`;
  }

  if (store.has(key)) {
    const retrievedValue = store.get(key);

    console.log(`Done: GET Key=${key} value=${retrievedValue}`);

    return `Success: Value "${retrievedValue}" for Key "${key}".`;
  } else {
    console.error(`Key "${key}" not found.`);
    return `ERROR: Key "${key}" not found.`;
  }
}
export function delKey(key: string, forwarded: string, nodes: string[]) {
  if (!key) {
    console.error('Received incomplete DEL command.');
    return `ERROR: DEL command must include key.`;
  }

  const isKeyExistAndDeleted = store.delete(key);

  if (!isKeyExistAndDeleted) {
    console.error(`Key "${key}" not found.`);
    return `ERROR: Key "${key}" not found.`;
  } else {
    console.log(`Done: DEL Key=${key}`);

    sendRequest('DEL', key, '', nodes, forwarded);

    return `Success: Value DELETED for Key "${key}".`;
  }
}
