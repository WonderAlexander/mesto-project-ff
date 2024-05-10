// Обраюотка ответа от сервера
const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Конфиг
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    methods: {
        get: 'GET',
        patch: 'PATCH',
        post:  'POST',
        delete: 'DELETE',
        put: 'PUT'
    },
    headers: {
      authorization: '91c8a61a-2bff-4162-b294-e942c6115324',
      'Content-Type': 'application/json'
    }
  }

// Получение данных пользовтеля
const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Получение всех карточек
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: config.methods.get,
        headers: config.headers
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Обновлени еданных пользователя
const updateUserData = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: config.methods.patch,
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Добавление новой кариточки
const addCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: config.methods.post,
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Удаление карточки
const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: config.methods.delete,
        headers: config.headers
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Поставить лайк карточке
const addLikeToCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: config.methods.put,
        headers: config.headers
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Убрать лайк карточке
const removeLikeFromCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: config.methods.delete,
        headers: config.headers
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

// Смена аватара
const setNewAvatar = (newAvatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: config.methods.patch,
        headers: config.headers,
        body: JSON.stringify({
            avatar: newAvatarLink
        })
    })
        .then(handleResponse)
        .catch( (err) => {
            console.log(err);
        })
}

export { getUserData, getInitialCards, updateUserData, addCard, deleteCard, addLikeToCard, removeLikeFromCard, setNewAvatar };
