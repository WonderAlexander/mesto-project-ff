const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: Функция создания карточки
function createCard(cardData, deleteFunction, likeFunction, handleImgModal) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    newCard.querySelector('.card__title').textContent = cardData.name;
    cardImg.addEventListener('click', () => handleImgModal(cardData));
    const deleteCardBtn = newCard.querySelector('.card__delete-button');
    deleteCardBtn.addEventListener('click', function () {
      deleteFunction(newCard);
    });
    const addLikeBtn = newCard.querySelector('.card__like-button');
    addLikeBtn.addEventListener('click', (e) => likeFunction(e));
    return newCard;
}

// @todo: Функция удаления карточки
const deleteCard = (element) => element.remove();

// Функция добавления like к карточке
const addLike = (evt) => evt.target.classList.toggle("card__like-button_is-active");


export { initialCards, createCard, deleteCard, addLike };
