// Фунция откытия попапа
function openModal(modalDom, openClass, animatedClass) {
    const modal = document.querySelector(modalDom);
    setTimeout(function () {
        modal.classList.add(openClass);
      }, 50);
      modal.classList.add('popup_is-animated');
    window.addEventListener('keydown', (evt) => closeModalKeyboard(evt.key, modalDom, openClass));
}

// Функция закрытия попапа
function closeModal(modalDom, openClass) {
    const modal = document.querySelector(modalDom);
    modal.classList.remove(openClass);
    window.removeEventListener('keydown', (evt) => closeModalKeyboard(evt.key, modalDom, openClass))
}

// Функция события клика по клавише
function closeModalKeyboard(key, modalDom, openClass) {
    if(key === 'Escape') {
        closeModal(modalDom, openClass);
    }
}

// Обработчки модалки
function modalHandler( modalDom, modalShowClass) {
    const modal = document.querySelector(modalDom);
    openModal(modalDom, modalShowClass);
    const modalClose = modal.querySelector('.popup__close');
    modalClose.addEventListener('click', () => closeModal(modalDom, modalShowClass));
    modal.addEventListener('click', (evt) => {
        if (evt.target.classList.contains(modalShowClass)) {
            closeModal(modalDom, modalShowClass);
        }
    })
}

// Обработчки модалки с картинкой
function modalImgHandler(event, modalDom, modalShowClass) {
    if( event.target.classList.contains('card__image')) {
        modalHandler( modalDom, modalShowClass);
        const popup = document.querySelector(modalDom);
        const popupuImg = popup.querySelector('.popup__image');
        const popupCaption = popup.querySelector('.popup__caption');
        popupuImg.src = event.target.src;
        popupuImg.alt = event.target.alt;
        popupCaption.textContent = event.target.alt;
    }
}

export { closeModal, modalHandler, modalImgHandler }
