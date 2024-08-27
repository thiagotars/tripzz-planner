import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastOfMonth = dayjs().year(year).month(month).endOf("month");

  let daysArray = [];

  for (let i = 0; i < firstOfMonth.day(); i++) {
    daysArray.push({ currentMonth: false, date: firstOfMonth.day(i) });
  }

  for (let i = firstOfMonth.date(); i <= lastOfMonth.date(); i++) {
    daysArray.push({
      currentMonth: true,
      date: firstOfMonth.date(i),
      today:
        firstOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  let remainingDays = 42 - daysArray.length;

  for (
    let i = lastOfMonth.date();
    i < lastOfMonth.date() + remainingDays;
    i++
  ) {
    daysArray.push({ currentMonth: false, date: lastOfMonth.date(i) });
  }

  return [daysArray];
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
