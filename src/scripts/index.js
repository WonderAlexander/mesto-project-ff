// Импорты
import { createCard, deleteCard, handleCardLikes } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserData, getInitialCards, updateUserData, addCard, setNewAvatar } from '../components/api.js';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Находим попапы в DOM
const popupEdit = document.querySelector('.popup_type_edit');
const editProfileForm = popupEdit.querySelector('.popup__form');
const editProfileFormBtn = editProfileForm.querySelector('.popup__button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardForm = popupNewCard.querySelector('.popup__form');
const addCardFromBtn = addCardForm.querySelector('.popup__button');
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardImgUrl = popupNewCard.querySelector('.popup__input_type_url');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImg = popupTypeImg.querySelector('.popup__image');
const popupCaption = popupTypeImg.querySelector('.popup__caption');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const editAvatarButton = popupEditAvatar.querySelector('.popup__button');
let user;



// Вызов попапа редактирования профиля
const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', () => {
    openModal(popupEdit);
    resetForm();
    clearValidation(editProfileForm, validationConfig);
})

// Вызов попапа добавления новой карточки
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => {
    clearValidation(addCardForm, validationConfig);
    openModal(popupNewCard);
});

// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// Находим аватар пользователя
const profileAvatar = document.querySelector('.profile__image');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    editLoadingState(true, editProfileFormBtn)
    // Обновление данных пользователя на сервере
    updateUserData(nameInput.value, jobInput.value)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileJob.textContent = jobInput.value;
            closeModal(popupEdit);
        })
        .catch( (err) => {
            console.log(err);
        })
        .finally( () =>  editLoadingState(false, editProfileFormBtn))
}

// Сброс полей формы
function resetForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// Cбор полей формы создания новой карточки
function resetCardForm(form) {
    form.reset();
    clearValidation(form, validationConfig);
}

// Функция открытия попапа создания новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    editLoadingState(true, addCardFromBtn);

    const newCard = {
        name: cardName.value,
        link: cardImgUrl.value
    }

    // Добавление карточки
    addCard(newCard)
        .then( (data) => cardsList.prepend(createCard(data, deleteCard, handleCardLikes, handleImgModal, user)))
        .then( () => {
            closeModal(popupNewCard );
            resetCardForm(evt.target);
        })
        .catch( (err) => {
            console.log(err);
        })
        .finally( () => editLoadingState(false, addCardFromBtn))
}

// Функци открытия попапа с картинкой карточки
function handleImgModal(card) {
    popupImg.src = card.link;
    popupImg.alt = card.link;
    popupCaption.textContent = card.name;
    openModal(popupTypeImg);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener('submit', handleFormSubmit);
const popupAdd = document.querySelector('.popup_type_new-card');
const formAdd = popupAdd.querySelector('.popup__form');

formAdd.addEventListener('submit', (e) => handleCardFormSubmit(e, cardName, cardImgUrl));

// Конфиг валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// API
Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {

        // Обновление данных пользователя в DOM
        profileTitle.textContent = userData.name;
        profileJob.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url('${userData.avatar}')`

        // Получение id пользователя
        user = userData;

        // Вывод карточек на страницу
        initialCards.forEach( card => {
            cardsList.append(createCard(card, deleteCard, handleCardLikes, handleImgModal, user));
        })
    })
    .catch( (err) => {
        console.log(err);
    })

// Функция отправки формы изменения аватара
const newAvatarField = popupEditAvatar.querySelector('.popup__input_type_url');
const newAvatarForm = popupEditAvatar.querySelector('.popup__form');

// Вызов попапа редактирования аватара
const editEvatarButton = document.querySelector('.profile__image_edit');
editEvatarButton.addEventListener('click', () => {
    clearValidation(addCardForm, validationConfig);
    openModal(popupEditAvatar);
});

function editAvatarFormSubit(evt) {
    evt.preventDefault();
    editLoadingState(true, editAvatarButton)
    const newAvatarLink = newAvatarField.value;
    setNewAvatar(newAvatarLink)
    .then( (response) => {
        profileAvatar.style.backgroundImage = `url('${response.avatar}')`;
    })
    .then( () => {
        closeModal(popupEditAvatar );
    })
    .catch( (err) => {
        console.log(err);
    })
    .finally( () => editLoadingState(false, editAvatarButton))
}

newAvatarForm.addEventListener('submit', (evt) => editAvatarFormSubit(evt));

// Функция обработки текста в кнопках форм
function editLoadingState(loadingState, formButton) {
    loadingState ? formButton.textContent = 'Сохранение...' : formButton.textContent = 'Сохранить'
}
