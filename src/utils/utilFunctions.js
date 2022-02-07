import { months } from './constants';

export const convertDate = (date) => {
  const myDate = date.split('T')[0];
  const day = myDate.split('-')[2];
  const month = months[parseInt(myDate.split('-')[1]) - 1];
  const year = myDate.split('-')[0];
  return `${month}  ${day}, ${year}`;
};
