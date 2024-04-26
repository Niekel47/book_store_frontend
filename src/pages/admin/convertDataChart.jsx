import moment from "moment";

export const convertDataChart = (data, type) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        if (!object[opt]) {
          object[opt] = 1;
        } else {
          object[opt] += 1;
        }
      });
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: item,
          value: object[item],
        };
      });
    return results;
  } catch (e) {
    return [];
  }
};

export const convertDataChartTotal = (data, type) => {
  try {
    let total = 0;
    Array.isArray(data) &&
      data.forEach((opt) => {
        total += Number(opt);
      });

    const results = [
      {
        name: type,
        value: total,
      },
    ];
    return results;
  } catch (e) {
    return [];
  }
};

export const calculateRevenue = (listOrder) => {
  let dailyRevenue = 0;
  let monthlyRevenue = 0;
  let yearlyRevenue = 0;

  const now = moment();
  const today = moment().startOf("day");
  const thisMonth = moment().startOf("month");
  const thisYear = moment().startOf("year");

  for (const order of listOrder) {
    console.log(listOrder); //
    const orderDate = moment(order.createdAt);
    if (orderDate.isSameOrAfter(today)) {
      dailyRevenue += order.total;
    }
    if (orderDate.isSameOrAfter(thisMonth)) {
      monthlyRevenue += order.total;
    }
    if (orderDate.isSameOrAfter(thisYear)) {
      yearlyRevenue += order.total;
    }
  }

  return [
    { name: "Daily", value: dailyRevenue },
    { name: "Monthly", value: monthlyRevenue },
    { name: "Yearly", value: yearlyRevenue },
  ];
};
