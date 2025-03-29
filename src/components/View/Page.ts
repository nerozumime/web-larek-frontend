import { settings } from "../../utils/constants";

export class Page {
  constructor(protected page: HTMLElement){}

  disableScroll(): void {
    this.page.classList.add(settings.stopScroll);
  }

  enableScroll(): void {
    this.page.classList.remove(settings.stopScroll);
  }
}