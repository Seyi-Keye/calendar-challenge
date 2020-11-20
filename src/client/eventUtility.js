import { getDifferenceInMinutes } from './date';

export const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * Calculate and return the height as duration of an event
 * using 100px as height per 1hour slot
 */
export const getHeightOfEvent = (startTime, endTime) => {
  const height = getDifferenceInMinutes(endTime, startTime);
  return (height / 60) * 75;
};
