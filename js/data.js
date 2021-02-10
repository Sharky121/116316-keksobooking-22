import {Coords, Offer} from './const.js';
import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArray} from './util.js';

const getCoords = () => {
  return {
    x: getRandomFloatInclusive(Coords.X_MIN, Coords.X_MAX, Coords.PRECISION),
    y: getRandomFloatInclusive(Coords.Y_MIN, Coords.Y_MAX, Coords.PRECISION),
  }
};

const createAd = () => {
  const coords = getCoords();

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntInclusive(8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(Offer.TITLES),
      address: `${coords.x}, ${coords.y}`,
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

export {createAd};