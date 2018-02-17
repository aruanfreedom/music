export const sortNumber = (array, value, order = true) => array.sort((a, b) =>
  (order ? a[value] - b[value] : b[value] - a[value]));

export const sortLetter = (array, value, order = true) => array.sort((a, b) => {
  const value1 = a[value].toLowerCase();
  const value2 = b[value].toLowerCase();
  if (order) {
    if (value1 > value2) {
      return 1;
    }
    if (value1 < value2) {
      return -1;
    }
    return 0;
  }
  if (value1 < value2) {
    return 1;
  }
  if (value1 > value2) {
    return -1;
  }
  return 0;
});
