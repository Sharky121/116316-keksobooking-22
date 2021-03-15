export const ADS_COUNT = 10;
export const MIN_ATTRIBUTE_INPUT = 'min';
export const PRECISION = 5;

export const TokyoCoords = {
  LAT: 35.681700,
  LNG: 139.753882,
}

export const Coords = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  PRECISION: 5,
};

export const Offer = {
  TITLES: ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8', 'Title 9', 'Title 10'],
  TYPES: ['palace', 'flat', 'house', 'bungalow'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  CHECKS: ['12:00', '13:00', '14:00'],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
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
};

export const RenderProperty = {
  TEXT_CONTENT: 'textContent',
  INNER_HTML: 'innerHTML',
  SRC: 'src',
};

export const TypeToPrice = {
  flat: '1000',
  house: '5000',
  bungalow: '0',
  palace: '10000',
};

export const MapEvents = {
  LOAD: 'load',
  MOVEEND: 'moveend',
}

export const Pins = {
  redPin: {
    URL: 'img/main-pin.svg',
    SIZE: [52, 52],
    ANCHOR_SIZE: [26, 52],
  },
  bluePin: {
    URL: 'img/pin.svg',
    SIZE: [52, 52],
    ANCHOR_SIZE: [26, 52],
  },
};

export const Tile = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}
