const getRandomIntInclusive = (min = 0, max = 1) => {
  if (max === undefined) {
    [min, max] = [0, min];
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0) {
    throw new Error('Ошибка! Минимальное значение меньше 0');
  }

  if (min === max) {
    throw new Error('Ошибка! Минимальное значение равно максимальному');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloatInclusive = (min = 0, max = 1, precision = 0) => {
  if (max === undefined) {
    [min, max] = [0, min];
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0) {
    throw new Error('Ошибка! Минимальное значение меньше 0');
  }

  if (min === max) {
    throw new Error('Ошибка! Минимальное значение равно максимальному');
  }

  return (Math.random() * (max - min + 1) + min).toFixed(precision);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(elements.length - 1)];
};

const getRandomArray = (array) => {
  const newArray = array.filter(() => {
    return getRandomIntInclusive();
  });

  return newArray.length !== 0
    ? newArray
    : array;
};

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArray};
