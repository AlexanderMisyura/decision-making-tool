import type { Option } from '@ts-types/index';

export default function isOptionValid(option: unknown): option is Option {
  return (
    typeof option === 'object' &&
    option !== null &&
    'id' in option &&
    typeof option.id === 'number' &&
    'title' in option &&
    typeof option.title === 'string' &&
    'weight' in option &&
    typeof option.weight === 'number'
  );
}
