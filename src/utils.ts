export const bpmToHz = (tempo: number, subDiv = 16) => {
  return (tempo / (60 * 4)) * subDiv;
};

export const clamp = (n: number, min = 0, max = 1) => {
  return Math.max(Math.min(n, max), min);
}
