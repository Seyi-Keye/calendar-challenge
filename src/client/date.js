import { differenceInMinutes, eachDayOfInterval, endOfWeek, getDate, getHours, getMinutes, startOfWeek, addHours } from 'date-fns'

export const startOf = startOfWeek(new Date());
export const endOf = endOfWeek(new Date());

export const getWeekDates = () => {
  let eachDay = eachDayOfInterval({ start: startOf, end: endOf });
  return eachDay;
};

export const getDay = (date) => date.getDate();

export const getThisMonth = (date) => date.getMonth();
export const getThisYear = (date) => date.getUTCFullYear();
export const getTheHour = (date) => getHours(new Date(date));
export const getDifferenceInMinutes = (startTime, endTime) => differenceInMinutes(new Date(startTime), new Date(endTime));
export const getTheMinutes = (date) => getMinutes(new Date(date));
export const getDateToday = () => getDate(new Date());
export const get12hourFormat = (x) => {
    if (x === -1) {
      return '';
    } else if (x === 0) {
      return '12 AM';
    } else if (x < 12) {
      return `${x} AM`;
    } else {
      return `${x - 12} PM`;
    }
  };

export const isSameDay = (day1, day2) => getDay(new Date(day1)) === getDay(new Date(day2));
export const isSameHour = (hour1, hour2) => getTheHour(hour1) === hour2;
export const addSomeHours = ()=> addHours(new Date(), 1);
