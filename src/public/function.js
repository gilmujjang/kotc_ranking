export default function getToday(today) {
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  month = month >= 10 ? month : `0${month}`;
  date = date >= 10 ? date : `0${date}`;

  return Number(`${year}${month}${date}`);
}
