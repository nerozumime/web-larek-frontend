import { IProductItem, IProductItemView } from "../../types";
import { settings } from "../../utils/constants";

export class CatalogueCard implements IProductItemView {
  protected itemElement: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLSpanElement;
  protected price: HTMLSpanElement;

  constructor(ProductTemplate: HTMLTemplateElement){
    this.itemElement = ProductTemplate.content.querySelector(settings.cardCatalogue).cloneNode(true) as HTMLElement;
    this.image = this.itemElement.querySelector(settings.cardImage);
    this.title = this.itemElement.querySelector(settings.cardTitle);
    this.category = this.itemElement.querySelector(settings.cardCategory);
    this.price = this.itemElement.querySelector(settings.cardPrice);

    this.itemElement.addEventListener('click', ()=> {
      console.log('click по карточке')
    })
  }

  render(data: IProductItem): HTMLElement {
    this.image.src = data.image;
    this.title.textContent = data.title; 
    this.category.textContent = data.category;
    this.price.textContent = String(data.price ? data.price : 'Бесценно');
    return this.itemElement;
  }
}