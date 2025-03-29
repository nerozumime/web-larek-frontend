import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api } from './components/base/api';
import { IModal, IOrder, IOrderModel, IOrderResponse, IProductItem, PaymentMethod, ProductList } from './types';
import { CatalogueProduct, PreviewProduct, BasketProduct} from './components/View/Product';
import { Modal } from './components/View/Modal'
import { IEvents, EventEmitter} from './components/base/events'
import { BasketView, IBasketView } from './components/View/Basket';
import { Basket, IBasket } from './components/Model/Basket';
import { Contacts, OrderView } from './components/View/Order';
import { Order } from './components/Model/Order';
import { SuccessOrder } from './components/View/SuccessOrder';
import { Page } from './components/View/Page'

const itemCatalogueTemplate = document.querySelector(settings.cardCatalogueTemplate) as HTMLTemplateElement;
const itemPreviewTemplate = document.querySelector(settings.cardPreviewTemplate) as HTMLTemplateElement;
const itemBasketTemplate = document.querySelector(settings.cardBasketTemplate) as HTMLTemplateElement;
const modalTemplate = document.querySelector(settings.cardPreviewModal) as HTMLTemplateElement;
const basketTemplate = document.querySelector(settings.basketTemplate) as HTMLTemplateElement;
const orderTemplate = document.querySelector(settings.orderTemplate) as HTMLTemplateElement; 
const contactsTemplate = document.querySelector(settings.contactsTemplate) as HTMLTemplateElement;
const successTemplate = document.querySelector(settings.successTemplate) as HTMLTemplateElement;

const basketButton = document.querySelector(settings.basketButton) as HTMLButtonElement;
const gallery = document.querySelector(settings.gallery);
const page = document.querySelector(settings.page) as HTMLElement;

const apiModel: Api = new Api(API_URL);
const events: IEvents = new EventEmitter();
const basketModel: IBasket = new Basket(events);
const modalView: IModal = new Modal(modalTemplate, events);
const basketVisual: IBasketView = new BasketView(basketTemplate, basketButton, events);
const orderVisual: OrderView = new OrderView(orderTemplate, events);
const orderModel: IOrderModel = new Order();
const contactsView: Contacts = new Contacts(contactsTemplate, events); 
const success: SuccessOrder = new SuccessOrder(successTemplate, events);
const pageView = new Page(page);

function getProductItems(): Promise<ProductList> {
  return apiModel.get(settings.apiProducts)
  .then(data => data as ProductList)
}

function postOrder(order: IOrder): Promise<IOrderResponse> {
  return apiModel.post(settings.apiOrder, order)
  .then((data: IOrderResponse) => data);
}

function toggleOrderSubmit(){
  orderModel.checkOrderInputs() ? orderVisual.toggleSubmitButton(true) : orderVisual.toggleSubmitButton(false);
  orderModel.checkContactsInputs() ? contactsView.toggleSubmitButton(true) : contactsView.toggleSubmitButton(false)
}

function validateForm(){
  orderModel.checkOrderInputs() 
  ? orderVisual.setError('') 
  : orderVisual.setError('Выберите способ оплаты и заполните адрес доставки'); 

  orderModel.checkContactsInputs()
  ? contactsView.setError('')
  : contactsView.setError('Введите email и номер телефона');
}

function checkBasketButton(): void {
  basketModel.getProductsCount() < 1 ? basketVisual.toggleSubmitButton(false) : basketVisual.toggleSubmitButton(true);
}

getProductItems()
  .then(data => {
    const products: IProductItem[] = data.items;
    products.map(product => product.image = CDN_URL + product.image)
    products.forEach(product => {
      const catalogueProductView = new CatalogueProduct(events, itemCatalogueTemplate, product);
      gallery.append(catalogueProductView.render())
    })
  })
  .catch(error => console.log(error));

// открытие модального окна 
events.on(settings.eventModalOpen, ()=> {
  pageView.disableScroll();
})

// закрытие модального окна
events.on(settings.eventModalClose, ()=> {
  pageView.enableScroll();
})

// открытие корзины
events.on(settings.eventBasketOpen, ()=> {
  checkBasketButton();
  modalView.content = basketVisual.render();
  if(basketModel.getProductsCount() < 1) basketVisual.setEmptyBasketTitle();
  modalView.open();
})

// нажатие по карточке товара
events.on(settings.eventProductPreview, product => {
  const data: IProductItem = product as IProductItem;
  modalView.content = new PreviewProduct(events, itemPreviewTemplate, data).render();
  modalView.open();
})

// добавление товара в корзину 
events.on(settings.eventBasketAdd, data => {
  basketModel.addProduct(data as IProductItem);
});

// обновление корзины (удаление товара, добавление товара, очистка корзины)
events.on(settings.eventBasketUpdate, () => {
  checkBasketButton();
  basketVisual.clearBasket();
  let currentIndex = 1;
  const productList: HTMLElement[] = Array.from(basketModel.getProductList()).map(product => {
    const basketProduct = new BasketProduct(events, itemBasketTemplate, product, currentIndex);
    currentIndex++;
    return basketProduct.render();
  })
  basketVisual.setProductsList((productList));
  basketVisual.totalPrice = basketModel.getTotalPrice();
});

// начало оформления заказа
events.on(settings.eventBasketSubmit, () => {
  orderModel.total = basketModel.getTotalPrice();
  orderModel.items = basketModel.getProductIds();
  modalView.content = orderVisual.render();
});

// установка способа оплаты
events.on(settings.eventOrderPayment, (data: {payment: string}) => {
  orderVisual.togglePaymentButton(data.payment);
  orderModel.payment = data.payment as PaymentMethod;
  toggleOrderSubmit();
  validateForm();
});

// изменение инпута формы
events.on(settings.eventInputChange, (data: {type: string, value: string}) => {
  switch(data.type){
    case 'adress':
      orderModel.address = data.value;
      break;
    case 'email':
      orderModel.email = data.value;
      break;
    case 'phone':
      orderModel.phone = data.value;
  }
  toggleOrderSubmit();
  validateForm();
});

// оформление заказа - контактные данные 
events.on(settings.eventContactsPayment, ()=> {
  modalView.content = contactsView.render();
  modalView.open();
})

// завершение оформления заказа 
events.on(settings.eventOrderDone, ()=> {
  postOrder(orderModel.getOrderData())
    .then(data => {
      console.log(data)
      success.setTotalPrice(data.total);
      modalView.content = success.render();
      modalView.open();
      basketModel.clearBasket();
      orderModel.clearOrder();
    })
    .catch(error => console.log(error));
})

// нажатие сабмита формы успешной оплаты 
events.on(settings.eventOrderSuccess, ()=> {
  modalView.close();
})
