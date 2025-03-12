import type { Option } from '@ts-types/index';

import isOptionValid from './option';

export default function isOptionsListValid(optionsList: unknown): optionsList is Option[] {
  return Array.isArray(optionsList) && optionsList.every((option) => isOptionValid(option));
}
