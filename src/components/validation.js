// Функция показа сообщеняи об ошибке
const showInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

// Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.name}`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

// Функция проверки валидации
const checkInputValidity = (formElement, inputList, inputElement, validationConfig) => {
    if(isInvalidRegex(inputList)) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        showInputError(formElement, inputElement, validationConfig);
    } else if(isInvalidValidity(inputList)){
        inputElement.setCustomValidity("");
        showInputError(formElement, inputElement, validationConfig);
    }else {
        hideInputError(formElement, inputElement, validationConfig);
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
    if(isInvalidValidity(inputList) || isInvalidRegex(inputList)) {
        submitBtn.classList.add(inactiveButtonClass);
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove(inactiveButtonClass);
        submitBtn.disabled = false;
    }
}

//  Функция добавленя слушателей
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach( (inputElement) => {
        // Обработка блокировки кнопки
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputList, inputElement, validationConfig);
            handleSubmitBtn(inputList, submitBtn, validationConfig.inactiveButtonClass);
        })
    })
};

// Функция валидации
function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach( (formElement) => formElement.addEventListener( 'submit', (evt) => {
        evt.preventDefault();
    }))
    formList.forEach( (formElement) => {
        setEventListeners(formElement, validationConfig);
    });
};

// Функция очистики валидации
function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
    handleSubmitBtn(inputList, submitBtn, validationConfig.inactiveButtonClass);
    inputList.forEach( (input) => {
        hideInputError(formElement, input, validationConfig);
    })
}

// Экспорт функций
export { enableValidation, clearValidation };
