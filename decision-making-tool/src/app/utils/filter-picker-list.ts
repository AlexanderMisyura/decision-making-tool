import type { Option } from '@ts-types/index';

import isPickOptionValid from './validation/pick-option';

export default function filterPickerList(options: Option[]): Option[] {
  return options.filter((element) => isPickOptionValid(element));
}
