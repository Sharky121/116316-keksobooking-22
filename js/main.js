'use strict'

const ADS_COUNT = 10;

const Coords = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  PRECISION: 5,
}

const Offer = {
  TITLES: ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8', 'Title 9', 'Title 10'],
  TYPES: ['palace', 'flat', 'house', 'bungalow'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  CHECKS: ['12:00', '13:00', '14:00'],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel5.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel6.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel7.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel8.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel9.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel10.jpg',
  ],
  DESCRIPTION: [
    'Description 1',
    'Description 2',
    'Description 3',
    'Description 4',
    'Description 5',
    'Description 6',
    'Description 7',
    'Description 8',
    'Description 9',
    'Description 10',
  ],
}

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
    throw new Error('Ошибка! Минимальное значение меньше или равно максимальному');
  }

  return (Math.random() * (max - min + 1) + min).toFixed(precision);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(elements.length - 1)];
}

const getAvatarUrl = (max) => {
  return 'img/avatars/user0' + getRandomIntInclusive(max) + '.png'
};

const getRandomArray = (array) => {
  const newArray = array.filter(() => {
    return getRandomIntInclusive();
  });

  return newArray.length !== 0
    ? newArray
    : array;
}

const getCoords = () => {
  return {
    x: getRandomFloatInclusive(Coords.X_MIN, Coords.X_MAX, Coords.PRECISION),
    y: getRandomFloatInclusive(Coords.Y_MIN, Coords.Y_MAX, Coords.PRECISION),
  }
};

const getOfferAddress = (coords) => {
  return Object
    .values(coords)
    .join(', ');
}

const createAd = () => {
  const coords = getCoords();

  return {
    author: {
      avatar: getAvatarUrl(8),
    },
    offer: {
      title: getRandomArrayElement(Offer.TITLES),
      address: getOfferAddress(coords),
      price: getRandomIntInclusive(2000, 30000),
      type: getRandomArrayElement(Offer.TYPES),
      rooms: getRandomIntInclusive(1, 5),
      guests: getRandomIntInclusive(1, 5),
      checkin: getRandomArrayElement(Offer.CHECKS),
      checkout: getRandomArrayElement(Offer.CHECKS),
      features: getRandomArray(Offer.FEATURES),
      description: getRandomArrayElement(Offer.DESCRIPTION),
      photos: getRandomArray(Offer.PHOTOS),
    },
    location: {
      x: coords.x,
      y: coords.y,
    },
  }
};

const ads = new Array(ADS_COUNT)
  .fill('')
  .map(() => createAd());

ads;
