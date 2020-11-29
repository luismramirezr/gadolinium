import moment from 'moment';

export const parseDate = (date: string, format = 'YYYY-MM-DD'): Date => {
  if (!date) return moment().toDate();
  try {
    const parsedDate = moment(date, format);
    if (!parsedDate.isValid()) throw new Error('Invalid date');
    return parsedDate.toDate();
  } catch (e) {
    return moment(date).toDate();
  }
};

export const dateToString = (date: Date, format = 'DD/MM/YYYY') =>
  date ? moment(date).format(format) : '';
