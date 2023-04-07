export const categoryList = [
  "Daily Essentials",
  "Grocery",
  "Transport",
  "Eating out",
  "Outing/Trip",
  "One time",
  "Shopping",
  "Sports/Games",
  "Rent",
  "Bills",
  "Health",
  "Electronics",
  "Toys",
  "Miscellaneous",
];

export const getCategory = (item) => {
  const lookUp = {
    711: "Daily Essentials",
    Daiso: "Daily Essentials",
    Lawson: "Daily Essentials",
    Donki: "Daily Essentials",
    Life: "Grocery",
    Vegitables: "Grocery",
    Cricket: "Sports/Games",
    Amazon: "Shopping",
    Suica: "Transport",
    "Ordered Food": "Eating out",
    "Baby Toys": "Toys",
  };
  return lookUp[item];
};

export const monthList = [
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
