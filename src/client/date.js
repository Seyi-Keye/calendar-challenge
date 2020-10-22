import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'

export const getWeekDates = () => {
  let startOf = startOfWeek(new Date());
  let endOf = endOfWeek(new Date());
  let eachDay = eachDayOfInterval({ start: startOf, end: endOf });
  return eachDay;
};

export const getDay = (date) => date.getDate();