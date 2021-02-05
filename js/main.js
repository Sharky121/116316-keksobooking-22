'use strict'

const getRandomIntInclusive = (min = 0, max) => {
  if (min < 0) {
    throw ('Ошибка! Минимальное значение меньше 0');
  }

  if (min > max || min === max) {
    throw ('Ошибка! Минимальное значение меньше или равно максимальному');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloatInclusive = (min = 0, max, precision) => {
  if (min < 0) {
    throw new Error('Ошибка! Минимальное значение меньше 0');
  }

  if (min > max || min === max) {
    throw new Error('Ошибка! Минимальное значение меньше или равно максимальному');
  }

  return (Math.random() * (max - min + 1) + min).toFixed(precision);
};

getRandomIntInclusive(1, 8);
getRandomFloatInclusive(4.5678, 11.45633313, 3);
