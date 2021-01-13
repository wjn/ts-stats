export const dateStringToDate = (dateString: string, delimiter: string = '/'): Date => {
  const dateParts = dateString.split(delimiter).map((value) => parseInt(value));

  // dates are Y,M,D where M is 0 based (Jan = 0)
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
