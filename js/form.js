import {MIN_ATTRIBUTE_INPUT, TypeToPrice} from './consts.js';

export const bindSelectToInputHandler = (select, input) => {
  input.setAttribute(MIN_ATTRIBUTE_INPUT, TypeToPrice[select.value]);
  input.placeholder = TypeToPrice[select.value];
}

export const syncSelectElementsHandler = (firstSelect, secondSelect) => {
  secondSelect.value = firstSelect.value;
};
