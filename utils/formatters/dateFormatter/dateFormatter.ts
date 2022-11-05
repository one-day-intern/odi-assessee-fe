const dateFormatter = (date: Date, nowDate?: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = nowDate ?? new Date(Date.now());
  const diffrenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInDays = Math.ceil(
    diffrenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  const differenceInYears = now.getFullYear() - date.getFullYear();

  if (differenceInDays <= 1 && now.getDate() === date.getDate()) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourString = (hours % 12).toString().padStart(2, "0");
    const minuteString = minutes.toString().padStart(2, "0");

    return `${hourString}:${minuteString} ${hours <= 12 ? "AM" : "PM"}`;
  }

  if (differenceInYears === 0) {
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  const monthString = (date.getMonth() + 1).toString().padStart(2, "0")
  const yearString = date.getFullYear().toString().slice(2)

  return `${date.getDate()}/${monthString}/${yearString}`;
};

export { dateFormatter };
