import { IProductItem, IProductItemView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class CatalogueCard implements IProductItemView {
  static categoryColor: Record<string, string> = {
    'софт-скил': '#83FA9D',
    'другое': '#FAD883',
    'дополнительное': '#B783FA', 
    'кнопка': '#83DDFA',
    'хард-скил' : '#FAA083'
  }
  protected itemElement: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLSpanElement;
  protected price: HTMLSpanElement;
  protected id: string;

  constructor(ProductTemplate: HTMLTemplateElement){
    this.itemElement = ProductTemplate.content.querySelector(settings.cardCatalogue).cloneNode(true) as HTMLElement;
    this.image = this.itemElement.querySelector(settings.cardImage);
    this.title = this.itemElement.querySelector(settings.cardTitle);
    this.category = this.itemElement.querySelector(settings.cardCategory);
    this.price = this.itemElement.querySelector(settings.cardPrice);
  }

  render(data: IProductItem): HTMLElement {
    this.image.src = data.image;
    this.title.textContent = data.title; 
    this.category.textContent = data.category;
    this.price.textContent = String(data.price ? data.price : 'Бесценно');
    this.category.style.background = CatalogueCard.categoryColor[data.category];
    this.id = data.id;

   // this.itemElement.addEventListener('click', () => this.emit('preview', {id: this.id}));
    
    return this.itemElement;
  }
}