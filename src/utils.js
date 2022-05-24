export const convertDate = (dateValue, type) => {
  var date = new Date(dateValue);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (month.toString().length === 1) {
    month = "0" + month;
  }
  if (day.toString().length === 1) {
    day = "0" + day;
  }
  if (hour.toString().length === 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length === 1) {
    minute = "0" + minute;
  }
  if (second.toString().length === 1) {
    second = "0" + second;
  }

  if (type === "onlydate") {
    return `${year}-${month}-${day} 00:00:00`;
  } else if (type === "yyyymmdd") {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};
