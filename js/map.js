/* global L:readonly */
import {TokyoCoords, MapEvents, Pins, Tile, PRECISION} from './consts.js';
import {createCardTemplate} from './card-template.js';

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
