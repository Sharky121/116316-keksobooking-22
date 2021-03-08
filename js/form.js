import {MIN_ATTRIBUTE_INPUT, typeToPrice} from './consts.js';

export const bindSelectToInputHandler = (select, input) => {
  input.setAttribute(MIN_ATTRIBUTE_INPUT, typeToPrice[select.value]);
  input.placeholder = typeToPrice[select.value];
}

export const syncSelectElementsHandler = (firstSelect, secondSelect) => {
  secondSelect.value = firstSelect.value;
};
