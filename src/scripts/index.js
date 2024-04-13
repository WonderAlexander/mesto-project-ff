import { initialCards, createCard, deleteCard, addLike } from '../components/cards.js';
import { modalHandler, modalImgHandler, closeModal} from '../components/modal.js';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Вывод карточек на страницу
initialCards.forEach( item => {
    cardsList.append(createCard(item, deleteCard, addLike));
})

// Вызов попапа редактирования профиля
const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', () => {
    modalHandler( '.popup.popup_type_edit','popup_is-opened');
    resetForm('.popup.popup_type_edit');
})

// // Вызов попапа добавления новой карточки
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => modalHandler( '.popup.popup_type_new-card','popup_is-opened'));

// Вызоы попапа картинки
const placesList = document.querySelector('.places__list');
placesList.addEventListener('click', (evt) => modalImgHandler(evt, '.popup.popup_type_image', 'popup_is-opened'));

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal('.popup.popup_type_edit', 'popup_is-opened');
    evt.target.reset();
}

// Сброс полей формы
function resetForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = document.querySelector('.popup__input_type_card-name');
    const cardImgUrl = document.querySelector('.popup__input_type_url');

    const newCard = {
        name: cardName.value,
        link: cardImgUrl.value
    }

    cardsList.prepend(createCard(newCard, deleteCard, addLike));
    closeModal('.popup_type_new-card', 'popup__showed');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
const popupAdd = document.querySelector('.popup_type_new-card');
const formAdd = popupAdd.querySelector('.popup__form');

formAdd.addEventListener('submit', (e) => handleCardFormSubmit(e));
