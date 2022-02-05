const toggleElementInArray = (array: string[], element: string) =>
  array.includes(element)
    ? array.filter((val: string) => val !== element)
    : [...array, element];

export default toggleElementInArray;
