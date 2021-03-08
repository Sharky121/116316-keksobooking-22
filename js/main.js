import {createCards} from './data.js';
import {createCardTemplate} from './card-template.js';
import {bindSelectToInputHandler, syncSelectElementsHandler} from './form.js';

const FormElement = {
  TYPE: document.querySelector('#type'),
  PRICE: document.querySelector('#price'),
  TIME_IN: document.querySelector('#timein'),
  TIME_OUT: document.querySelector('#timeout'),
  TIME: document.querySelector('.ad-form__element--time').querySelectorAll('select'),
};

const mapCanvasElement = document.querySelector('#map-canvas');
const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const cardsTemplateFragment = document.createDocumentFragment();

const cards = createCards();

cards.forEach((card) => {
  const cardTemplate = createCardTemplate(card, cardTemplateElement);

  cardsTemplateFragment.appendChild(cardTemplate);
});

mapCanvasElement.appendChild(cardsTemplateFragment.firstElementChild);

// Инициализирует начальное состояние типа жилья и цены за ночь
bindSelectToInputHandler(FormElement.TYPE, FormElement.PRICE);

// Вешает обработчик на select типа жилья
FormElement.TYPE.addEventListener('change', (evt) => {
  bindSelectToInputHandler(evt.target, FormElement.PRICE);
});

// Вешает обработчик на select время заезда
FormElement.TIME_IN.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormElement.TIME_OUT);
});

// Вешает обработчик на select время выезда
FormElement.TIME_OUT.addEventListener('change', (evt) => {
  syncSelectElementsHandler(evt.target, FormElement.TIME_IN);
});
