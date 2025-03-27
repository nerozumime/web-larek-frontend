export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  apiProducts: '/product',
  gallery: '.gallery',
  cardCatalogueTemplate: '#card-catalog',
  cardCatalogue: '.gallery__item',
  cardImage: '.card__image',
  cardTitle: '.card__title',
  cardCategory: '.card__category',
  cardPrice: '.card__price',
  cardDescription: '.card__text',
  
  cardPreviewTemplate: '#card-preview',
  cardPreview: '.card_full',

  cardBasketTemplate: '#card-basket',
  cardBasket: '.card_compact',

  modalActive: 'modal_active',
  cardPreviewModal: '#modal-container',
  modalContent: '.modal__content',
  modalContainer: '.modal__container',
  modalCloseButton: '.modal__close',
  submitButton: '.button',

  basketTemplate: '#basket',
  basket: '.basket',
  basketButton: '.header__basket',
  basketCounter: '.header__basket-counter',
  eventClick: 'click'
};
