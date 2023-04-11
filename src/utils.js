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
  } else if (type === "periode") {
    return `${year}-${month}`;
  } else if (type === "pajak") {
    return `${day}/${month}/${year}`;
  } else {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const decimalNumber = (number) => {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "0";
  }
};

export const calculatePeriode = (dateValue, tanggal) => {
  var date = new Date(dateValue);

  var defaultStartPeriode = convertDate(date, "periode");
  var defaultEndPeriode = convertDate(
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
    "yyyymmdd"
  );

  const result = {
    start: `${defaultStartPeriode}-01`,
    end: defaultEndPeriode,
  };

  if (Number(tanggal) > 1) {
    var startPeriode = convertDate(date, "periode");
    var endPeriode = convertDate(
      new Date(date.setMonth(date.getMonth() + 1)),
      "periode"
    );

    result.start = `${startPeriode}-${tanggal.toString().padStart(2, "0")}`;
    // if (Number(tanggal) === 20) {
    //   result.end = `${endPeriode}-${(Number(tanggal) + 1)
    //     .toString()
    //     .padStart(2, "0")}`;
    // } else {
    result.end = `${endPeriode}-${tanggal.toString().padStart(2, "0")}`;
    //}
  }

  return result;
};

export const mappingRegional = (regional) => {
  switch (regional) {
    case "REGIONAL_MEDAN":
      return "01";
    case "REGIONAL_JAKARTA":
      return "02";
    case "REGIONAL_BANDUNG":
      return "03";
    case "REGIONAL_SEMARANG":
      return "04";
    case "REGIONAL_SURABAYA":
      return "05";
    case "REGIONAL_MAKASAR":
      return "06";
    default:
      return "P0";
  }
};
