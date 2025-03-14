import type OptionsList from '@components/options-list/options-list';

import type Router from '../../router';

export type ControlsCallbacks = {
  add: () => void;
  paste: () => void;
  clear: OptionsList['clearOptionsList'];
  start: Router['handleLink'];
};
