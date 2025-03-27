import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api, ApiPostMethods } from './components/base/api';
import { IProductItem, ProductList } from './types';
import { CatalogueProduct, PreviewProduct} from './components/View/Product';
import { Modal } from './components/View/Modal'

const itemCatalogueTemplate = document.querySelector(settings.cardCatalogueTemplate) as HTMLTemplateElement;
const itemPreviewTemplate = document.querySelector(settings.cardPreviewTemplate) as HTMLTemplateElement;
const cardPreviewModalTemplate = document.querySelector(settings.cardPreviewModal) as HTMLTemplateElement;

const basket = document.querySelector(settings.basket) as HTMLElement;
const basketButton = document.querySelector(settings.basketButton) as HTMLButtonElement;
const gallery = document.querySelector(settings.gallery);

basketButton.addEventListener('click', ()=> {
  ModalView.content = basket;
  ModalView.open()
})

const ApiModel: Api = new Api(API_URL);
const ModalView: Modal = new Modal(cardPreviewModalTemplate);

function getProductItems(): Promise<ProductList> {
  return ApiModel.get(settings.apiProducts)
  .then(data => data as ProductList)
}

getProductItems()
  .then(data => {
    const Products: IProductItem[] = data.items;
    Products.map(product => product.image = CDN_URL + product.image)
    console.log(Products)
    Products.forEach(product => {
      const catalogueProductView = new CatalogueProduct(itemCatalogueTemplate);
      
      catalogueProductView.render(product).addEventListener('click', ()=> {
        ModalView.content = new PreviewProduct(itemPreviewTemplate).render(product);
        ModalView.open()
      })
      gallery.append(catalogueProductView.render(product))
    })
  })