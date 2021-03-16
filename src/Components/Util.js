export const refreshPage = () => {
  window.location.reload();
};
export const timeSince = (time) => {
  const date = new Date(time * 1);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " m";
  }
  return Math.floor(seconds) + " s";
};

export const full_date = (date) => {
  const newDate = new Date(date * 1);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDay();
  let month_name;
  switch (month) {
    case 0:
      month_name = "january";
      break;
    case 1:
      month_name = "february";
      break;
    case 2:
      month_name = "march";
      break;
    case 3:
      month_name = "april";
      break;
    case 4:
      month_name = "may";
      break;
    case 5:
      month_name = "june";
      break;
    case 6:
      month_name = "july";
      break;
    case 7:
      month_name = "august";
      break;
    case 8:
      month_name = "september";
      break;
    case 9:
      month_name = "october";
      break;
    case 10:
      month_name = "november";
      break;
    default:
      month_name = "december";
      break;
  }
  return `${month_name} ${day}, ${year}`;
};
