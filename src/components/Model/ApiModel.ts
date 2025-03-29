import { IOrder, IOrderResponse, ProductList } from "../../types";
import { settings } from "../../utils/constants";
import { Api } from "../base/api";
import { IEvents } from "../base/events";

export class ApiModel {
  constructor(protected api: Api, protected events: IEvents){}

  getProductItems(): Promise<ProductList> {
    return this.api.get(settings.apiProducts)
    .then(data => data as ProductList)
  }
  
  postOrder(order: IOrder): Promise<IOrderResponse> {
    return this.api.post(settings.apiOrder, order)
    .then((data: IOrderResponse) => data);
  }
}