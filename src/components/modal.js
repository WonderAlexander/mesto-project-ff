// Фунция откытия попапа
function openModal(modal) {
    setTimeout(function () {
        modal.classList.add('popup_is-opened');
    }, 50);
    modal.classList.add('popup_is-animated');
    modal.addEventListener('click', handleClose);
    window.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа
function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('click', handleClose);
    window.removeEventListener('keydown', closeByEscape);
}

// Функция события клика по клавише
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function handleClose(evt) {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget);
    }
}

export { openModal, closeModal }
