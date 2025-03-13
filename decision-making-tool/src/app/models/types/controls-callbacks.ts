import type OptionsList from '@components/options-list/options-list';

import type Router from '../../router';

export type ControlsCallbacks = {
  add: OptionsList['appendOption'];
  clear: OptionsList['clearOptionsList'];
  start: Router['handleLink'];
};
