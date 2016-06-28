export const BEGIN = 'BEGIN';
export const ADVANCE = 'ADVANCE';

export function begin() {
  return {
    type: BEGIN
  };
}
export function advance(boost) {
  return {
    type: ADVANCE,
    boost: boost
  };
}