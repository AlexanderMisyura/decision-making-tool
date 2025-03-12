import './styles/global.scss';

import Page from '@components/page/page';
import machine from '@state-machine/machine';

import Router from './router';

const ROUTES = [
  { pathname: '/', machineTrigger: 'navigateOptionsList' },
  { pathname: '/picker', machineTrigger: 'navigatePicker' },
];

export default class App {
  private router: Router;
  private page: Page;

  constructor() {
    const routeObjects = ROUTES.map((route) => ({
      pathname: route.pathname,
      callback: (): string | void =>
        machine.makeTransition(machine.value, route.machineTrigger, {
          currentRoute: route.pathname,
        }),
    }));

    this.router = new Router(routeObjects);
    this.page = new Page(machine, this.router.handleLink);
  }

  public init(): void {
    this.page.mount();
    this.router.initialLoad();
  }
}
