import machine from '@state-machine/machine';
import type { RouteObject } from '@ts-types/route-object';

function getCurrentHref(): string {
  return globalThis.location.href;
}

function getCurrentPathname(): string {
  return globalThis.location.pathname.replace(BASE_PATH, '/');
}

export default class Router {
  constructor(private routeObjects: RouteObject[]) {
    globalThis.addEventListener('popstate', () => this.initialLoad());
  }

  public handleLink = (event: Event): void => {
    event.preventDefault();
    const { currentTarget } = event;
    if (currentTarget instanceof HTMLAnchorElement) {
      const currentHref = getCurrentHref();

      if (currentHref !== currentTarget.href) {
        this.navigate(currentTarget.href);
      }
    }
  };

  public initialLoad(): void {
    const currentPathname = getCurrentPathname();
    this.load(currentPathname);
  }

  private load(pathname: string): void {
    const currentRouteObject = this.getCurrentRouteObj(pathname);

    if (currentRouteObject) {
      currentRouteObject.callback();
    } else {
      machine.makeTransition(machine.value, 'navigateError', { currentRoute: pathname });
    }
  }

  private getCurrentRouteObj(pathname: string): RouteObject | undefined {
    const currentRouteObject = this.routeObjects.find((route) => route.pathname === pathname);
    if (!currentRouteObject) return;

    return currentRouteObject;
  }

  private navigate(href: string): void {
    const url = new URL(href);
    globalThis.history.pushState({}, '', url);

    const pathname = BASE_PATH ? url.pathname.replace(BASE_PATH, '/') : url.pathname;

    this.load(pathname);
  }
}
