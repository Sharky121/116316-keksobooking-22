import {createCards} from './data.js';
import {bindSelectToInputHandler, syncSelectElementsHandler, selectValidateHandler, titleValidateHandler, priceValidateHandler} from './form.js';
import {renderMap} from './map.js';
import {togglePageState} from './page-state.js';

// ОСНОВНЫЕ ЭЛЕМЕНТЫ
const adFormElement = document.querySelector('.ad-form');
const buttonSubmitElement = document.querySelector('.ad-form__submit');
const filtersFormElement = document.querySelector('.map__filters');
const mapCanvasElement = document.querySelector('#map-canvas');

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

// СОЗДАЁТ КАРТОЧКИ ОБЪЯВЛЕНИЙ
const cards = createCards();

// ВЫСТАВЛЯЕТ НАЧАЛЬНОЕ СОСТОЯНИЕ СТРАНИЦЫ
togglePageState(false, adFormElement, filtersFormElement);
bindSelectToInputHandler(FormFieldElement.TYPE, FormFieldElement.PRICE);

// РЕНДЕРИТ КАРТУ
renderMap(
  mapCanvasElement,
  cards,
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

// ОТПРАВКА И ВАЛИДАЦИЯ ФОРМ
buttonSubmitElement.addEventListener('click', (evt) => {
  selectValidateHandler(evt, FormFieldElement.ROOMS, FormFieldElement.CAPACITY);
  titleValidateHandler(FormFieldElement.TITLE);
  priceValidateHandler(FormFieldElement.PRICE);

  FormFieldElement.ROOMS.addEventListener('change', () => {
    FormFieldElement.ROOMS.setCustomValidity('');
  });

  if (adFormElement.checkValidity()) {
    adFormElement.submit();
  }
});

