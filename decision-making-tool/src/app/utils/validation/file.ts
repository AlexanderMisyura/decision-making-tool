import type { FileContent } from '@ts-types/index';

import isLastIdValid from './last-id';
import isOptionsListValid from './option-list';

export default function isFileContentValid(fileContent: unknown): fileContent is FileContent {
  return (
    typeof fileContent === 'object' &&
    fileContent !== null &&
    'options' in fileContent &&
    isOptionsListValid(fileContent.options) &&
    'lastId' in fileContent &&
    isLastIdValid(fileContent.lastId)
  );
}
