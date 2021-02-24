import {createCards} from './data.js';
import {createCardTemplate} from './card-template.js';

const mapCanvasElement = document.querySelector('#map-canvas');
const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const cardsTemplateFragment = document.createDocumentFragment();

const cards = createCards();

cards.forEach((card) => {
  const cardTemplate = createCardTemplate(card, cardTemplateElement);

  cardsTemplateFragment.appendChild(cardTemplate);
});

mapCanvasElement.appendChild(cardsTemplateFragment.firstElementChild);
