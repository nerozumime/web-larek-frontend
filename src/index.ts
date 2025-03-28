import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api } from './components/base/api';
import { IModal, IOrder, IOrderResponse, IProductItem, PaymentMethod, ProductList } from './types';
import { CatalogueProduct, PreviewProduct, BasketProduct} from './components/View/Product';
import { Modal } from './components/View/Modal'
import { IEvents, EventEmitter} from './components/base/events'
import { BasketView, IBasketView } from './components/View/Basket';
import { Basket, IBasket } from './components/Model/Basket';
import { Contacts, OrderView } from './components/View/Order';
import { Order } from './components/Model/Order';
import { SuccessOrder } from './components/View/SuccessOrder';

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

const ApiModel: Api = new Api(API_URL);
const Events: IEvents = new EventEmitter();
const BasketModel: IBasket = new Basket(Events);
const ModalView: IModal = new Modal(modalTemplate, Events);
const BasketVisual: IBasketView = new BasketView(basketTemplate, basketButton, Events);
const OrderVisual: OrderView = new OrderView(orderTemplate, Events);
const OrderModel: IOrder = new Order();
const ContactsView: Contacts = new Contacts(contactsTemplate, Events); 
const Success: SuccessOrder = new SuccessOrder(successTemplate, Events);

function getProductItems(): Promise<ProductList> {
  return ApiModel.get(settings.apiProducts)
  .then(data => data as ProductList)
}

function postOrder(order: IOrder): Promise<IOrderResponse> {
  return ApiModel.post(settings.apiOrder, order)
  .then((data: IOrderResponse) => data);
}

function toggleOrderSubmit(){
  OrderModel.checkOrderInputs() ? OrderVisual.toggleSubmitButton(true) : OrderVisual.toggleSubmitButton(false);
  OrderModel.checkContactsInputs() ? ContactsView.toggleSubmitButton(true) : ContactsView.toggleSubmitButton(false)
}

function checkBasketButton(): void {
  BasketModel.getProductsCount() < 1 ? BasketVisual.toggleSubmitButton(false) : BasketVisual.toggleSubmitButton(true);
}

getProductItems()
  .then(data => {
    const Products: IProductItem[] = data.items;
    Products.map(product => product.image = CDN_URL + product.image)
    Products.forEach(product => {
      const catalogueProductView = new CatalogueProduct(Events, itemCatalogueTemplate, product);
      gallery.append(catalogueProductView.render())
    })
  })
  .catch(error => console.log(error));

// открытие модального окна 
Events.on(settings.eventModalOpen, ()=> {
  page.classList.add(settings.stopScroll);
})

// закрытие модального окна
Events.on(settings.eventModalClose, ()=> {
  page.classList.remove(settings.stopScroll);
})

// открытие корзины
Events.on(settings.eventBasketOpen, ()=> {
  checkBasketButton();
  ModalView.content = BasketVisual.render();
  ModalView.open();
})

// нажатие по карточке товара
Events.on(settings.eventProductPreview, product => {
  const data: IProductItem = product as IProductItem;
  ModalView.content = new PreviewProduct(Events, itemPreviewTemplate, data).render();
  ModalView.open();
})

// добавление товара в корзину 
Events.on(settings.eventBasketAdd, data => {
  BasketModel.addProduct(data as IProductItem);
});

// обновление корзины (удаление товара, добавление товара, очистка корзины)
Events.on(settings.eventBasketUpdate, () => {
  checkBasketButton();
  BasketVisual.clearBasket();
  let currentIndex = 1;
  Array.from(BasketModel.getProductList()).forEach(product => {
    const basketProduct = new BasketProduct(Events, itemBasketTemplate, product, currentIndex);
    BasketVisual.addProduct(basketProduct.render());
    currentIndex++;
  })
  BasketVisual.totalPrice = BasketModel.getTotalPrice();
});

// начало оформления заказа
Events.on(settings.eventBasketSubmit, () => {
  OrderModel.total = BasketModel.getTotalPrice();
  OrderModel.items = BasketModel.getProductIds();
  ModalView.content = OrderVisual.render();
});

// установка способа оплаты
Events.on(settings.eventOrderPayment, (data: {payment: string}) => {
  OrderVisual.togglePaymentButton(data.payment);
  OrderModel.payment = data.payment as PaymentMethod;
  toggleOrderSubmit();
});

// изменение инпута формы
Events.on(settings.eventInputChange, (data: {type: string, value: string}) => {
  switch(data.type){
    case 'adress':
      OrderModel.address = data.value;
      break;
    case 'email':
      OrderModel.email = data.value;
      break;
    case 'phone':
      OrderModel.phone = data.value;
  }
  toggleOrderSubmit();
});

// оформление заказа - контактные данные 
Events.on(settings.eventContactsPayment, ()=> {
  ModalView.content = ContactsView.render();
  ModalView.open();
})

// завершение оформления заказа 
Events.on(settings.eventOrderDone, ()=> {
  postOrder(OrderModel)
    .then(data => {
      Success.setTotalPrice(data.total);
      ModalView.content = Success.render();
      ModalView.open();
      BasketModel.clearBasket();
      OrderModel.clearOrder();
    })
    .catch(error => console.log(error));
})

// нажатие сабмита формы успешной оплаты 
Events.on(settings.eventOrderSuccess, ()=> {
  ModalView.close();
})