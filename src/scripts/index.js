import { initialCards, createCard, deleteCard, addLike } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Вывод карточек на страницу
initialCards.forEach( item => {
    cardsList.append(createCard(item, deleteCard, addLike, handleImgModal));
})

// Находим попапы в DOM
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const cardName = popupNewCard.querySelector('.popup__input_type_card-name');
const cardImgUrl = popupNewCard.querySelector('.popup__input_type_url');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImg = popupTypeImg.querySelector('.popup__image');
const popupCaption = popupTypeImg.querySelector('.popup__caption');

// Вызов попапа редактирования профиля
const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', () => {
    openModal(popupEdit);
    resetForm();
})

// Вызов попапа добавления новой карточки
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => openModal(popupNewCard));

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
    closeModal(popupEdit);
    evt.target.reset();
}

// Сброс полей формы
function resetForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// Функция открытия попапа создания новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardName.value,
        link: cardImgUrl.value
    }

    cardsList.prepend(createCard(newCard, deleteCard, addLike, handleImgModal ));
    closeModal(popupNewCard );
    evt.target.reset();
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
formElement.addEventListener('submit', handleFormSubmit);
const popupAdd = document.querySelector('.popup_type_new-card');
const formAdd = popupAdd.querySelector('.popup__form');

formAdd.addEventListener('submit', (e) => handleCardFormSubmit(e, cardName, cardImgUrl));
