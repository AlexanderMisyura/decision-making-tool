import './styles/global.scss';

import Page from '@components/page/page';
import machine from '@state-machine/machine';
import type { RouteObject } from '@ts-types/index';

import controller from './controller';
import Router from './router';

export default class App {
  private router: Router;
  private page: Page;

  constructor() {
    this.router = new Router(this.getRouteObjects());
    this.page = new Page(machine, this.router.handleLink);
  }

  public init(): void {
    this.page.mount();
    this.router.initialLoad();
  }

  private getRouteObjects(): RouteObject[] {
    return [
      {
        pathname: '/',
        callback: (): string | void =>
          machine.makeTransition(machine.value, 'navigateOptionsList', { currentRoute: '/' }),
      },
      {
        pathname: '/picker',
        callback: (): string | void => {
          const pickerList = controller.getPickerList();
          if (pickerList) {
            machine.makeTransition(machine.value, 'navigatePicker', {
              pickerList,
              currentRoute: '/picker',
            });
          } else {
            this.router.navigate(globalThis.location.origin + BASE_PATH);
            this.page.showMessage('noValidOptions');
          }
        },
      },
    ];
  }
}
