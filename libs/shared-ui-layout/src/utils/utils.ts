import moment from 'moment';
export function momentParseDateCalendar(date: string) {
  return moment(date).calendar();
}
