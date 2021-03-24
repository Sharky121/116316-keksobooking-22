import {
  setFormDefault,
  bindSelectToInputHandler,
  syncSelectElementsHandler,
  selectValidateHandler,
  titleValidateHandler,
  priceValidateHandler} from './form.js';
import {renderMap} from './map.js';
import {togglePageState} from './page-state.js';
import {sendData} from './fetch-api.js';
import {renderError, renderSuccess} from './messages.js';

// ОСНОВНЫЕ ЭЛЕМЕНТЫ
const adFormElement = document.querySelector('.ad-form');
const buttonSubmitElement = document.querySelector('.ad-form__submit');
const filtersFormElement = document.querySelector('.map__filters');
const mapCanvasElement = document.querySelector('#map-canvas');
const adFormResetButton = document.querySelector('.ad-form__reset');

// ШАБЛОНЫ
const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

// ЭЛЕМЕНТЫ ОСНОВНОЙ ФОРМЫ
const FormFieldElement = {
  TITLE: adFormElement.querySelector('#title'),
  TYPE: adFormElement.querySelector('#type'),
  PRICE: adFormElement.querySelector('#price'),
  TIME_IN: adFormElement.querySelector('#timein'),
  TIME_OUT: adFormElement.querySelector('#timeout'),
  ADDRESS: adFormElement.querySelector('#address'),
  ROOMS: adFormElement.querySelector('#room_number'),
  CAPACITY: adFormElement.querySelector('#capacity'),
};

// ВЫСТАВЛЯЕТ НАЧАЛЬНОЕ СОСТОЯНИЕ СТРАНИЦЫ
togglePageState(false, adFormElement, filtersFormElement);
bindSelectToInputHandler(FormFieldElement.TYPE, FormFieldElement.PRICE);

// РЕНДЕРИТ КАРТУ
const mainMarker = renderMap(
  mapCanvasElement,
  cardTemplateElement,
  FormFieldElement.ADDRESS,
  togglePageState.bind({}, true, adFormElement, filtersFormElement),
);

// ВЕШАЕТ ОБРАБОТЧИК НА SELECT ТИПА ЖИЛЬЯ
FormFieldElement.TYPE.addEventListener('change', (evt) => {
  bindSelectToInputHandler(evt.target, FormFieldElement.PRICE);
});

// ВЕШАЕТ ОБРАБОТЧИК НА SELECT ВРЕМЯ ЗАЕЗДА
FormFieldElement.TIME_IN.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormFieldElement.TIME_OUT);
});

// ВЕШАЕТ ОБРАБОТЧИК НА SELECT ВРЕМЯ ВЫЕЗДА
FormFieldElement.TIME_OUT.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormFieldElement.TIME_IN);
});

// ВАЛИДАЦИЯ ФОРМЫ
buttonSubmitElement.addEventListener('click', () => {
  titleValidateHandler(FormFieldElement.TITLE);
  selectValidateHandler(FormFieldElement.ROOMS, FormFieldElement.CAPACITY);
  priceValidateHandler(FormFieldElement.PRICE);

  FormFieldElement.ROOMS.addEventListener('change', () => {
    FormFieldElement.ROOMS.setCustomValidity('');
  });
});

// ОТПРАВКА ФОРМЫ
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    ()=> {
      setFormDefault(adFormElement, filtersFormElement, mainMarker, FormFieldElement.ADDRESS);
      renderSuccess();
    },
    () => {
      renderError();
    },
    new FormData(evt.target));
});

// ОЧИСТКА ФОРМЫ
adFormResetButton.addEventListener('click', () => {
  setFormDefault(adFormElement, filtersFormElement, mainMarker, FormFieldElement.ADDRESS);
});
