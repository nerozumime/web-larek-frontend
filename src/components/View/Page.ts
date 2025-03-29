import { IPage } from "../../types";
import { settings } from "../../utils/constants";

export class Page implements IPage {
  constructor(protected page: HTMLElement){}

  disableScroll(): void {
    this.page.classList.add(settings.stopScroll);
  }

  enableScroll(): void {
    this.page.classList.remove(settings.stopScroll);
  }
}