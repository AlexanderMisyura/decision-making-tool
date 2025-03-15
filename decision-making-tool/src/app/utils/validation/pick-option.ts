import type { Option } from '@ts-types/index';

export default function isPickOptionValid(option: Option): boolean {
  return option.title !== '' && option.weight > 0;
}
