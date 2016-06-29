export const BEGIN = 'BEGIN';
export const ADVANCE = 'ADVANCE';
export const SORT_SELECTION = 'SORT_SELECTION';

export function begin() {
  return {
    type: BEGIN
  };
}
export function advance(elementName) {
  return {
    type: ADVANCE,
    boost: elementName
  };
}
export function sortSelection(elementName) {
  return {
    type: SORT_SELECTION,
    select: elementName
  };
}