import type { PasteListOption } from '@ts-types/paste-list-option';

export default function parseText(text: string): PasteListOption[] | void {
  const partialOptions: PasteListOption[] = [];
  const lines = text.split('\n');
  for (const line of lines) {
    const separatorIndex = line.lastIndexOf(',');
    if (separatorIndex === -1) continue;

    const title = line.slice(0, separatorIndex).trim();
    const weight = Number(line.slice(separatorIndex + 1));

    if (Number.isNaN(weight)) continue;

    partialOptions.push({ title, weight });
  }

  return partialOptions;
}
