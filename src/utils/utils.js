export const numToReadableString = (input, decimals=1, addSpace=false) => {
  let num = Number(input);
  if (num === null || num === undefined) {
    return '-';
  }
  let units = ['', 'K', 'M', 'B', 'T'];
  let conversions = [1000, 1000, 1000, 1000, Infinity];

  let i;
  for (i = 0; i < units.length; i++) {
    if (Math.abs(num) < conversions[i]) {
      break;
    }
    num /= conversions[i];
  }
  // Convert to string with the desired number of decimals, UNLESS those
  // decimals are zeros, in which case they are removed
  if (addSpace) {
    return parseFloat(num.toFixed(decimals)).toString() + ' ' + units[i];
  }
  return parseFloat(num.toFixed(decimals)).toString() + units[i];
};