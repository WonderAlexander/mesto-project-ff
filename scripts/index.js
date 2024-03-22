// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = cardData.link;
    newCard.querySelector('.card__image').alt = cardData.name;
    newCard.querySelector('.card__title').textContent = cardData.name;
    const deleteCardBtn = newCard.querySelector('.card__delete-button');
    deleteCardBtn.addEventListener('click', function () {
        deleteFunction(newCard);
    });
    return newCard;
}

// @todo: Функция удаления карточки
const deleteCard = (element) => element.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach( item => {
    cardsList.append(createCard(item, deleteCard));
})
