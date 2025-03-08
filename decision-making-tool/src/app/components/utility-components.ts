import type { ComponentProperties } from './base-component';
import BaseComponent from './base-component';

/**
 * @template {HTMLElement} T
 */
type UtilityTagProperties<K extends keyof HTMLElementTagNameMap = 'div'> = Omit<
  ComponentProperties<K>,
  'elementTag'
>;

const span = (
  properties: UtilityTagProperties<'span'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'span'> =>
  new BaseComponent<'span'>({ ...properties, elementTag: 'span' }, ...children);

const div = (
  properties: UtilityTagProperties,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'div'> =>
  new BaseComponent<'div'>({ ...properties, elementTag: 'div' }, ...children);

const h1 = (
  properties: UtilityTagProperties<'h1'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'h1'> => new BaseComponent({ ...properties, elementTag: 'h1' }, ...children);

const input = (properties: UtilityTagProperties<'input'>): BaseComponent<'input'> =>
  new BaseComponent<'input'>({ ...properties, elementTag: 'input' });

const a = (
  properties: UtilityTagProperties<'a'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'a'> => new BaseComponent<'a'>({ ...properties, elementTag: 'a' }, ...children);

const label = (
  properties: UtilityTagProperties<'label'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'label'> =>
  new BaseComponent<'label'>({ ...properties, elementTag: 'label' }, ...children);

const img = (properties: UtilityTagProperties<'img'>): BaseComponent<'img'> =>
  new BaseComponent<'img'>({ ...properties, elementTag: 'img' });

const button = (
  properties: UtilityTagProperties<'button'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'button'> =>
  new BaseComponent<'button'>({ ...properties, elementTag: 'button' }, ...children);

const details = (
  properties: UtilityTagProperties<'details'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'details'> =>
  new BaseComponent<'details'>({ ...properties, elementTag: 'details' }, ...children);

const summary = (properties: UtilityTagProperties<'summary'>): BaseComponent<'summary'> =>
  new BaseComponent<'summary'>({ ...properties, elementTag: 'summary' });

const ul = (
  properties: UtilityTagProperties<'ul'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'ul'> => new BaseComponent<'ul'>({ ...properties, elementTag: 'ul' }, ...children);

const li = (
  properties: UtilityTagProperties<'li'>,
  ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
): BaseComponent<'li'> => new BaseComponent<'li'>({ ...properties, elementTag: 'li' }, ...children);

export default {
  span,
  div,
  h1,
  input,
  label,
  a,
  img,
  button,
  details,
  summary,
  ul,
  li,
};
