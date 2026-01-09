export const getVisiblePages = (currentPage: number, totalPages: number): (number | '...')[] => {
  const delta = 2;

  const range: (number | '...')[] = [];

  let left = currentPage - delta;
  let right = currentPage + delta;

  if (left < delta) {
    left = delta;
  }

  if (right > totalPages - 1) {
    right = totalPages - 1;
  }

  range.push(1);

  if (left > delta) {
    range.push('...');
  }

  for (let i = left; i < right; i++) {
    range.push(i);
  }

  if (right < totalPages - delta) {
    range.push('...');
  }

  if (totalPages > 1) {
    range.push(totalPages - 1);
  }
  return range;
};
