/* global L:readonly */
import {createCardTemplate} from './card-template.js';

const PRECISION = 5;
const TokyoCoords = {
  LAT: 35.681700,
  LNG: 139.753882,
}
const MapEvents = {
  LOAD: 'load',
  MOVEEND: 'moveend',
}
const Pins = {
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
const Tile = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

const createCustomPopup = (card, cardTemplate) => {
  return createCardTemplate(card, cardTemplate);
};

const bindMarkerToInputHandler = (coords, input) => {
  const {lat, lng} = coords;

  input.value = lat.toFixed(PRECISION) + ', ' + lng.toFixed(PRECISION);
}

export const renderMap = (container, cards, popupTemplate, inputElement, activatePage) => {
  const map = L.map(container)
    .on(MapEvents.LOAD, () => {
      activatePage();
      bindMarkerToInputHandler(L.latLng(TokyoCoords.LAT, TokyoCoords.LNG), inputElement);
    })
    .setView(L.latLng(TokyoCoords.LAT, TokyoCoords.LNG), 8);

  const tile = L.tileLayer(
    Tile.URL,
    {
      attribution: Tile.ATTRIBUTION,
    },
  );

  const mainPinMarker = L.icon({
    iconUrl: Pins.redPin.URL,
    iconSize: Pins.redPin.SIZE,
    iconAnchor: Pins.redPin.ANCHOR_SIZE,
  });

  const pinMarker = L.icon({
    iconUrl: Pins.bluePin.URL,
    iconSize: Pins.bluePin.SIZE,
    iconAnchor: Pins.bluePin.ANCHOR_SIZE,
  });

  const marker = L.marker(
    {
      lat: TokyoCoords.LAT,
      lng: TokyoCoords.LNG,
    },
    {
      draggable: true,
      icon: mainPinMarker,
    },
  );

  marker.on(MapEvents.MOVEEND, (evt) => {
    bindMarkerToInputHandler(evt.target.getLatLng(), inputElement);
  });

  tile.addTo(map);
  marker.addTo(map);
  cards.forEach((card) => {
    const {location: {x, y}} = card;

    const marker = L.marker(
      {
        lat: x,
        lng: y,
      },
      {
        icon: pinMarker,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCustomPopup(card, popupTemplate),
        {
          keepInView: true,
        },
      );
  });
};
