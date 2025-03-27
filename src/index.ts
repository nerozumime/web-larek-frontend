import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api, ApiPostMethods } from './components/base/api';
import { IProductItem, ProductList } from './types';
import { CatalogueCard } from './components/View/CatalogueCard';
import { Modal } from './components/View/Modal'
import { ProductPreview } from './components/View/PreviewCard';

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
    Products.map(item => item.image = CDN_URL + item.image)
    console.log(Products)
    Products.forEach(product => {
      const item = new CatalogueCard(itemCatalogueTemplate);
      console.log(new ProductPreview(itemPreviewTemplate).render(product))
      item.render(product).addEventListener('click', ()=> {
        ModalView.content = new ProductPreview(itemPreviewTemplate).render(product);
        ModalView.open()
      })
      gallery.append(item.render(product))
    })
  })