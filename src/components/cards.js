// Импорты
import { deleteCard as delCardFromServer, addLikeToCard, removeLikeFromCard } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction, likeFunction, handleImgModal, user) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const cardLikes = newCard.querySelector('.card__like-count');
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardLikes.textContent = cardData.likes.length;
    newCard.querySelector('.card__title').textContent = cardData.name;
    cardImg.addEventListener('click', () => handleImgModal(cardData));
    const deleteCardBtn = newCard.querySelector('.card__delete-button');
    if( cardData.owner._id !== user._id) {
      deleteCardBtn.style.display = 'none';
      deleteCardBtn.disabled = true;
    }
    deleteCardBtn.addEventListener('click', function () {
      deleteFunction(newCard, cardData);
    });
    const addLikeBtn = newCard.querySelector('.card__like-button');
    addLikeBtn.addEventListener('click', (evt) => handleCardLikes(evt, cardData, user, cardLikes));
    return newCard;
}

// @todo: Функция удаления карточки
const deleteCard = (card, cardData) => {
  delCardFromServer(cardData._id)
    .then(() => {
      card.remove();
    })
    .catch( (err) => {
      console.log(err);
    })
}

const handleCardLikes = (evt, cardData, user, likesPlaceholder) => {
  if(cardData.likes.some( (like) => like.name === user.name)) {
    removeLikeFromCard(cardData._id)
      .then( (response) => {
        evt.target.classList.remove("card__like-button_is-active");
        likesPlaceholder.textContent = response.likes.length;
      })
      .catch( (err) => {
        console.log(err);
      })
  }else {
    addLikeToCard(cardData._id)
    .then( (response) => {
      likesPlaceholder.textContent = response.likes.length;
      evt.target.classList.add("card__like-button_is-active");
    })
    .catch( (err) => {
      console.log(err);
    })
  }
}

export { createCard, deleteCard, handleCardLikes };
