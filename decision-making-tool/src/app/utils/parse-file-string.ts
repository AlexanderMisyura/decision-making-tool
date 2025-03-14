import type { FileContent } from '@ts-types/index';

import isFileContentValid from './validation/file';

export default function parseFileString(string: string): FileContent | void {
  let parsed: unknown;

  try {
    parsed = JSON.parse(string);
  } catch {
    parsed = undefined;
  }

  if (parsed && isFileContentValid(parsed)) return parsed;
}
