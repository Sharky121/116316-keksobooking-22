const MIN_ATTRIBUTE_INPUT = 'min';
const RADIX = 10;
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const VALIDITY_TEXT = 'Количество комнат не соответствует кол-ву гостей';

const TypeToPrice = {
  flat: '1000',
  house: '5000',
  bungalow: '0',
  palace: '10000',
};
const RoomsToCapacity = {
  1 : [1],
  2 : [1, 2],
  3 : [1, 2, 3],
  100 : [0],
};

const validatePlacement = (firstSelect, secondSelect) => {
  const firstValue = firstSelect.options[firstSelect.selectedIndex].value;
  const secondValue = secondSelect.options[secondSelect.selectedIndex].value;

  const capacityArray = RoomsToCapacity[firstValue];

  return capacityArray.some((item) => item === parseInt(secondValue, RADIX));
}

export const bindSelectToInputHandler = (select, input) => {
  input.setAttribute(MIN_ATTRIBUTE_INPUT, TypeToPrice[select.value]);
  input.placeholder = TypeToPrice[select.value];
}

export const syncSelectElementsHandler = (firstSelect, secondSelect) => {
  secondSelect.value = firstSelect.value;
};

export const selectValidateHandler = (evt, roomsSelect, capacitySelect) => {
  evt.preventDefault();

  const validateStatus = validatePlacement(roomsSelect, capacitySelect);

  if (!validateStatus) {
    roomsSelect.setCustomValidity(VALIDITY_TEXT);
    roomsSelect.reportValidity();
  } else {
    roomsSelect.setCustomValidity('')
  }
};

export const titleValidateHandler = (input) => {
  input.addEventListener('input', () => {
    const valueLength = input.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      input.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      input.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
    } else {
      input.setCustomValidity('');
    }
  });

  input.reportValidity();
};

export const priceValidateHandler = (input) => {
  input.addEventListener('input', () => {
    const valueLength = input.value.length;

    if (valueLength > MAX_PRICE) {
      input.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
    } else if (valueLength === '') {
      input.setCustomValidity('Поле не должно быть пустым');
    } else if (input.validity.typeMismatch) {
      input.setCustomValidity('Поле должно быть числовым');
    } else {
      input.setCustomValidity('');
    }
  });

  input.reportValidity();
};
