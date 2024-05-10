// Функция показа сообщеняи об ошибке
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__error_visible');
    errorElement.textContent = inputElement.validationMessage;
};

// Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

// Функция проверки валидации
const checkInputValidity = (formElement, inputList, inputElement) => {
    if(isInvalidRegex(inputList)) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        showInputError(formElement, inputElement);
    } else if(isInvalidValidity(inputList)){
        inputElement.setCustomValidity("");
        showInputError(formElement, inputElement);
    }else {
        hideInputError(formElement, inputElement);
    }
};

// Проверка браузерной валидности
const isInvalidValidity = (inputList) => {
    return inputList.some( (input) => !input.validity.valid);
}

// Проверка на соотвествие регулярному выражению
const isInvalidRegex = (inputList) => {
    return inputList.some( (input) => input.validity.patternMismatch);
}

// Функция выключения кнопки отправки
function handleSubmitBtn(inputList, submitBtn, inactiveButtonClass) {
    isInvalidValidity(inputList) || isInvalidRegex(inputList) ? submitBtn.classList.add(inactiveButtonClass) : submitBtn.classList.remove(inactiveButtonClass);
}

//  Функция добавленя слушателей
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitBtn = formElement.querySelector(submitButtonSelector);
    inputList.forEach( (inputElement) => {
        // Обработка блокировки кнопки
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputList, inputElement);
            handleSubmitBtn(inputList, submitBtn, inactiveButtonClass);
        })
    })
};

// Функция валидации
function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    const inputSelector = validationConfig.inputSelector;
    const submitButtonSelector = validationConfig.submitButtonSelector;
    const inactiveButtonClass = validationConfig.inactiveButtonClass;
    formList.forEach( (formElement) => formElement.addEventListener( 'submit', (evt) => {
        evt.preventDefault();
    }))
    formList.forEach( (formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass);
    });
};

// Функция очистики валидации
function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
    handleSubmitBtn(inputList, submitBtn, validationConfig.inactiveButtonClass);
    inputList.forEach( (input) => {
        hideInputError(formElement, input);
    })
}

// Экспорт функций
export { enableValidation, clearValidation };
