import { IProductItem, IProductItemView } from "../../types";
import { settings } from "../../utils/constants";

export class ProductPreview implements IProductItemView {
  protected itemElement: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLSpanElement;
  protected description: HTMLElement;
  protected price: HTMLSpanElement;
  protected id: string;

  constructor(ProductTemplate: HTMLTemplateElement){
    this.itemElement = ProductTemplate.content.querySelector(settings.cardPreview).cloneNode(true) as HTMLElement;
    this.image = this.itemElement.querySelector(settings.cardImage);
    this.title = this.itemElement.querySelector(settings.cardTitle);
    this.category = this.itemElement.querySelector(settings.cardCategory);
    this.description = this.itemElement.querySelector(settings.cardDescription);
    this.price = this.itemElement.querySelector(settings.cardPrice);
  }

  render(data: IProductItem): HTMLElement {
    this.image.src = data.image;
    this.title.textContent = data.title; 
    this.category.textContent = data.category;
    this.price.textContent = String(data.price ? data.price : 'Бесценно');
    this.description = this.description;
    this.id = data.id;
    return this.itemElement;
  }
}