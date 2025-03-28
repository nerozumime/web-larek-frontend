export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  currency: 'синапсов',
  zeroPrice: 'Бесценно',
  apiProducts: '/product',
  gallery: '.gallery',
  page: '.page',
  stopScroll: 'stop-scroll',

  cardCatalogueTemplate: '#card-catalog',
  cardCatalogue: '.gallery__item',
  cardImage: '.card__image',
  cardTitle: '.card__title',
  cardCategory: '.card__category',
  cardPrice: '.card__price',
  cardDescription: '.card__text',
  cardIndex: '.basket__item-index',
  
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
  basketList: '.basket__list',
  basketPrice: '.basket__price',
  basketItemDelete: '.basket__item-delete',
  basketItemIndex: '.basket__item-index',
  basketButton: '.header__basket',
  basketCounter: '.header__basket-counter',

  orderTemplate: '#order',
  contactsTemplate: '#contacts',
  form: '.form',
  formErrors: '.form__errors',
  paymentCard: '.button_card',
  paymentCash: '.button_cash',
  formInput: '.form__input',
  emailInput: '.email_input',
  phoneInput: '.phone_input',

  eventClick: 'click',
  eventModalOpen : 'modal:open',
  eventModalClose: 'modal:close',
  eventProductPreview: 'product:preview',
  eventBasketOpen: 'basket:open',
  eventBasketUpdate: 'basket:update',
  eventBasketAdd: 'basket:add',
  eventBasketRemove: 'basket:remove',
  eventBasketSubmit: 'basket:submit',
};
